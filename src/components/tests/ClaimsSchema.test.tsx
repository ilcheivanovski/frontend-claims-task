import { ClaimsSchema } from "../Claims";
describe("ClaimsSchema Validation Functions", () => {
  it('validates fields', async () => {
    // Valid values
    const validData = {
      name: "Valid Name",
      type: { label: "Some Label", value: "Some Value" },
      coverId: { label: "Some Label", value: "Some Value" },
      damageCost: 10,
    };

    // Invalid values
    const invalidData = {
      name: "This is a very long invalid name that exceeds the maximum length",
      type: {},
      coverId: {},
      damageCost: "abc",
    };

    // Test all fields at once
    await expect(ClaimsSchema.validate(validData)).resolves.toEqual(validData);
    await expect(ClaimsSchema.validate(invalidData)).rejects.toThrow();
  });
});
