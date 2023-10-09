class BreakingText {
  constructor(text) {
    this.text = text;
    this.words = text.split(' ');
    this.result = [];
    this.MAX_LENGTH = 140;
    this.spaceLength = 1;
    this.numberOfSMS = 1;
    this.currentSMS = '';
    this.amountSMS = Math.round(text.length / 140);
    this.amountSMSLength = this.amountSMS.toString().length;
    this.suffixLength =
      this.numberOfSMS.toString().length +
      this.spaceLength +
      this.amountSMSLength;
  }

  splitSMS() {
    if (this.text.length < this.MAX_LENGTH) {
      this.result.push(this.text);
      return this.result;
    }

    for (let i = 0; i < this.words.length; i++) {
      if (
        this.currentSMS.length +
          this.words[i].length +
          this.spaceLength +
          this.suffixLength <
        this.MAX_LENGTH
      ) {
        this.currentSMS += `${this.words[i]} `;
        if (i === this.words.length - 1) {
          this.currentSMS += `${this.numberOfSMS}/${this.amountSMS}`;
          this.result.push(this.currentSMS);
        }
      } else {
        this.currentSMS += `${this.numberOfSMS}/${this.amountSMS}`;
        this.result.push(this.currentSMS);
        this.currentSMS = `${this.words[i]} `;
        this.numberOfSMS++;
        this.suffixLength =
          this.numberOfSMS.toString().length +
          this.spaceLength +
          this.amountSMSLength;
      }
    }

    this.#fixSuffix(this.result);
    this.#fixLength(this.result);
    this.#fixSuffix(this.result);

    return this.result;
  }

  #fixLength() {
    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i].length >= this.MAX_LENGTH) {
        const resultElem = result[i].split(' ');
        const lastElemIndex = resultElem.length - 2;
        result[i + 1] = resultElem[lastElemIndex] + ' ' + result[i + 1];
        const suffix = `${i + 1}/${result.length}`;
        resultElem.splice(lastElemIndex, 2, suffix);
        this.result[i] = resultElem.join(' ');
      }
    }
  }

  #fixSuffix() {
    for (let i = 0; i < this.result.length; i++) {
      const resultElem = this.result[i].split(' ');
      const suffix = `${i + 1}/${this.result.length}`;
      resultElem.splice(-1, 1, suffix);
      this.result[i] = resultElem.join(' ');
    }
  }
}

module.exports = BreakingText;
