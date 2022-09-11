import { Errors } from './errors';

export const enum Rule {
  Required = 'required',
  Max = 'max',
  Min = 'min',
  String = 'string',
  Number = 'number',
  Array = 'array',
}

const ErrorMessage = {
  [Rule.Required]: (field: string) => `This field ${field} is required`,
  [Rule.Max]: (field: string, max: number) =>
    `Max length of this field ${field} must be ${max}`,
  [Rule.Min]: (field: string, min: number) =>
    `Min length of this field ${field} must be ${min}`,
  [Rule.String]: (field: string) => `This field ${field} is must be a string`,
  [Rule.Number]: (field: string) => `This field ${field} is must be a number`,
  [Rule.Array]: (field: string) => `This field ${field} is must be a array`,
};

export abstract class Model {
  errors = [] as Errors;

  loadData(data: any) {
    for (const [key, value] of Object.entries(data)) {
      if (key in this) {
        // @ts-ignore
        this[key] = value;
      }
    }
  }

  validate() {
    for (const [attribute, rules] of Object.entries(this.rules())) {
      // @ts-ignore
      const value = this[attribute];
      for (const [ruleName, ruleValue] of Object.entries(rules)) {
        if (ruleName === Rule.Required && ruleValue && !value) {
          this.addErrorByRule(attribute, Rule.Required, ruleValue);
        }
        if (ruleName === Rule.Max && value > ruleValue) {
          this.addErrorByRule(attribute, Rule.Max, ruleValue);
        }
        if (ruleName === Rule.Min && value < ruleValue) {
          this.addErrorByRule(attribute, Rule.Min, ruleValue);
        }
        if (
          ruleName === Rule.String &&
          ruleValue &&
          typeof value !== 'string'
        ) {
          this.addErrorByRule(attribute, Rule.String, ruleValue);
        }
        if (
          ruleName === Rule.Number &&
          ruleValue &&
          typeof value !== 'number'
        ) {
          this.addErrorByRule(attribute, Rule.Number, ruleValue);
        }
        if (ruleName === Rule.Array && ruleValue && !Array.isArray(value)) {
          this.addErrorByRule(attribute, Rule.Array, ruleValue);
        }
      }
    }

    return !this.errors.length;
  }

  protected abstract rules(): Record<string, object>;

  private addErrorByRule(attribute: string, rule: Rule, param: any) {
    this.errors.push(ErrorMessage[rule](attribute, param));
  }
}
