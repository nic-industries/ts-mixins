export default {

  Pluralize: (number: number) => {

    const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

    const ordinals = {
      one: 'st',
      two: 'nd',
      few: 'rd',
      many: 'th',
      zero: 'th',
      other: 'th'
    };

    return `${number}${ordinals[pr.select(number)]}`;

  }

}
