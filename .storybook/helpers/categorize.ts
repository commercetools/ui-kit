const categorize = (subcategory: string, index: number) => ({
  table: { subcategory: `${subcategory}${index ? ` ${index}` : ''}` },
});

export default categorize;
