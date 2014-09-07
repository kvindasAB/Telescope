var validUrlProperty = {
  propertyName: 'forceValidUrlOnly',
  propertySchema: {
    type: Boolean,
    label: "Force posts to provide a valid URL",
    optional: true
  }
}
addToSettingsSchema.push(validUrlProperty);
