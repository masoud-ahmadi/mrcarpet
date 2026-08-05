$(document).ready(function () {
  $('.price-range').each(function () {
    const wrapper = this;

    const minRange = wrapper.querySelector('.minRange');
    const maxRange = wrapper.querySelector('.maxRange');
    const range = wrapper.querySelector('.range');

    const minInput = wrapper.querySelector('.minInput');
    const maxInput = wrapper.querySelector('.maxInput');
    const applyBtn = wrapper.querySelector('.applyBtn');

    const minGap = 1000000;
    const maxValue = parseInt(maxRange.max, 10);

    const format = (n) => Number(n).toLocaleString('en-US');
    const parseValue = (v) => Number(v.replace(/[^\d]/g, '') || 0);

    function update(caller) {
      let min = parseInt(minRange.value, 10);
      let max = parseInt(maxRange.value, 10);

      if (max - min < minGap) {
        if (caller === minRange) minRange.value = max - minGap;
        else maxRange.value = min + minGap;
      }

      min = parseInt(minRange.value, 10);
      max = parseInt(maxRange.value, 10);

      const left = (min / maxValue) * 100;
      const right = (max / maxValue) * 100;

      range.style.left = left + '%';
      range.style.width = right - left + '%';

      minInput.value = format(min);
      maxInput.value = format(max);
    }

    // اسلایدر
    minRange.addEventListener('input', () => update(minRange));
    maxRange.addEventListener('input', () => update(maxRange));

    // inputs فقط نمایش
    function handleInput(input, rangeInput) {
      input.addEventListener('blur', () => {
        input.value = format(parseValue(input.value));
      });
    }

    handleInput(minInput, minRange);
    handleInput(maxInput, maxRange);

    // دکمه اعمال
    applyBtn.addEventListener('click', () => {
      const min = parseValue(minInput.value);
      const max = parseValue(maxInput.value);
      const url = new URL(window.location.href);
      url.searchParams.set('min', min);
      url.searchParams.set('max', max);
      window.location.href = url.toString();
    });

    // init
    update();
  });
});
