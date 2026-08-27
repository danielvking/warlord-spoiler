<template>
  <div class="option-tags input-group" :class="{ 'option-tags-open': open }">
    <!-- mousedown, not click: the menu must settle before focus moves, or the
         browser's own focus handling reopens what a toggle just closed. -->
    <div class="form-control option-tags-control" @mousedown="onControlDown">
      <span
        v-for="tag in selected"
        :key="labelFor(tag)"
        class="badge bg-secondary option-tags-tag"
      >
        {{ labelFor(tag) }}
        <button
          type="button"
          class="btn-close option-tags-remove"
          :aria-label="'Remove ' + labelFor(tag)"
          @mousedown.stop.prevent="removeByPointer(tag)"
          @click.stop.prevent="removeByClick(tag)"
        />
      </span>
      <input
        ref="input"
        :id="id"
        :value="search"
        class="option-tags-input"
        type="text"
        role="combobox"
        autocomplete="off"
        :aria-expanded="open ? 'true' : 'false'"
        :placeholder="selected.length ? '' : placeholder"
        @input="search = $event.target.value"
        @focus="open = true"
        @blur="onBlur"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="commitActive"
        @keydown.esc="open = false"
        @keydown.delete="onBackspace"
      />
    </div>
    <button
      type="button"
      class="btn btn-outline-secondary option-tags-caret"
      tabindex="-1"
      :aria-label="open ? 'Close the list' : 'Open the list'"
      @mousedown="onControlDown"
    >
      <svg viewBox="0 0 16 16" width="16" height="12" aria-hidden="true">
        <path :d="open ? 'm2 11 6-6 6 6' : 'm2 5 6 6 6-6'" fill="none" stroke="currentColor"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>
    </button>
    <ul v-if="open && matches.length" class="option-tags-menu dropdown-menu show">
      <li v-for="(option, i) in matches" :key="labelFor(option)">
        <button
          type="button"
          class="dropdown-item"
          :class="{ active: i === activeIndex }"
          role="option"
          :aria-selected="i === activeIndex"
          @mousedown.prevent="add(option)"
          @mouseenter="activeIndex = i"
        >
          {{ labelFor(option) }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// A multiselect: pick options from a filtered list, each one added as a
// removable tag.
//
//   Options    plain strings, or objects passed through to the model
//              untouched, so a caller can round-trip its own records.
//   Model      the selected array, emitted as update:modelValue and change.
//   Filtering  typing narrows the list, and reopens it after an add.
export default {
  name: "OptionTags",
  props: {
    modelValue: Array,
    options: { type: Array, default: () => [] },
    placeholder: String,
    // Applied to the inner input, not the wrapper: b-form-group renders its
    // caption as a <legend> unless label-for points at a labelable control,
    // and a <legend> will not share a row with the field in a horizontal group.
    id: String
  },
  // change fires alongside update:modelValue, because callers hang a refresh
  // off it.
  emits: ["update:modelValue", "change"],
  data() {
    return { search: "", open: false, activeIndex: 0, removedByPointer: null };
  },
  computed: {
    selected() {
      return this.modelValue || [];
    },
    matches() {
      let term = this.search.toLowerCase();
      return this.options
        .filter((x) => !this.selected.some((y) => this.sameOption(x, y)))
        .filter((x) => !term || this.labelFor(x).toLowerCase().includes(term));
    }
  },
  watch: {
    matches() {
      this.activeIndex = 0;
    },
    // Typing brings the menu back after an add dismissed it, so several tags
    // can be added in a row without clicking back in.
    search(value) {
      if (value) this.open = true;
    }
  },
  methods: {
    emitValue(value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", value);
    },
    // The display text for an option, which may be a plain string.
    labelFor(option) {
      if (option == null || typeof option !== "object") return String(option ?? "");
      return String(option.label ?? option.text ?? option.value ?? "");
    },
    // Object options match on .id when they carry one, so a copy that has been
    // through storage still counts as already selected.
    sameOption(a, b) {
      if (a === b) return true;
      if (a && b && typeof a === "object" && typeof b === "object") {
        return a.id != null ? a.id === b.id : this.labelFor(a) === this.labelFor(b);
      }
      return false;
    },
    // Two regions. The text region takes a cursor and always opens, because
    // focus in the input means open. Everything else, so the caret, a pill or
    // the slack, toggles.
    onControlDown(event) {
      let input = this.$refs.input;
      if (event.target === input) {
        // Never toggle here: after an add the input is still focused with the
        // menu shut, and clicking the text you are already in has to bring the
        // list back.
        this.open = true;
        return;
      }
      // Keep the browser from moving focus itself, or a focus event reopens
      // the menu the toggle just closed.
      event.preventDefault();
      if (this.open) {
        this.open = false;
        input.blur();
      } else {
        this.open = true;
        input.focus();
      }
    },
    onBlur() {
      // Focus has genuinely left, because every interaction inside the control
      // prevents the default and keeps focus here.
      this.open = false;
      this.search = "";
    },
    move(delta) {
      this.open = true;
      if (!this.matches.length) return;
      this.activeIndex = (this.activeIndex + delta + this.matches.length) % this.matches.length;
    },
    commitActive() {
      let option = this.matches[this.activeIndex];
      if (option != null) this.add(option);
    },
    add(option) {
      this.emitValue(this.selected.concat([option]));
      this.search = "";
      this.activeIndex = 0;
      // Keep the cursor so more can be typed, but dismiss the menu, because it
      // covers the field and the choice has been made. This is the one way to
      // end up focused with the menu shut.
      this.open = false;
    },
    remove(tag) {
      this.emitValue(this.selected.filter((x) => x !== tag));
    },
    // A pointer removes on mousedown, so the tag goes before the control sees
    // the event and toggles. Keyboard activation only ever produces a click, so
    // that path has to work too, without removing a second tag when a mouse
    // produces both.
    removeByPointer(tag) {
      this.removedByPointer = tag;
      this.remove(tag);
    },
    removeByClick(tag) {
      if (this.removedByPointer === tag) {
        this.removedByPointer = null;
        return;
      }
      this.remove(tag);
    },
    onBackspace() {
      if (this.search === "" && this.selected.length) {
        this.remove(this.selected[this.selected.length - 1]);
      }
    }
  }
};
</script>

<style scoped>
.option-tags {
  position: relative;
  min-width: 0;
}

/* Bootstrap styles .form-control:focus, but focus lands on the inner input,
   so the shell gets the same treatment via :focus-within. */
.option-tags-control:focus-within {
  border-color: var(--bs-form-control-focus-border-color, #86b7fe);
  box-shadow: 0 0 0 var(--bs-focus-ring-width, 0.25rem) var(--bs-focus-ring-color, rgba(13, 110, 253, 0.25));
}

.option-tags-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  cursor: text;
  /* A badge does not wrap its own text, so a tag wider than the control cannot
     shrink. The caret is a sibling button rather than a background, so an
     overflowing tag scrolls within the field instead of running under it. */
  overflow-x: auto;
}

.option-tags-caret {
  /* Centres the chevron in a button that stretches to the field's height. */
  display: flex;
  align-items: center;
  /* The caret is part of the control, so it carries the field's background in
     every state rather than going transparent at rest and filling solid on
     hover. .form-control takes --bs-body-bg too, so the two always agree. */
  --bs-btn-bg: var(--bs-body-bg);
  --bs-btn-hover-bg: var(--bs-body-bg);
  --bs-btn-hover-color: var(--bs-secondary-color);
  --bs-btn-active-bg: var(--bs-body-bg);
  --bs-btn-active-color: var(--bs-secondary-color);
}

/* A plain .badge otherwise. Only the close button needs positioning. */
.option-tags-tag {
  display: inline-flex;
  align-items: center;
}

.option-tags-remove {
  font-size: 0.5rem;
  margin-left: 0.35rem;
  /* .btn-close rests at 0.5 opacity, which is too faint against the badge. */
  --bs-btn-close-opacity: 1;
  --bs-btn-close-hover-opacity: 0.75;
}

.option-tags-input {
  flex: 1 1 4rem;
  min-width: 4rem;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
}

.option-tags-menu {
  position: absolute;
  /* Below the whole group, so it does not cover the caret that closes it.
     Flush against the control, because a gap reads as a detached panel and on
     touch it is a strip that dismisses instead of selecting. */
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  margin-top: 0;
}
</style>
