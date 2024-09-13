const envVars: Record<string, string | undefined> = {
  /** Needed for setting up the cookie-consent script */
  COOKIELAW_ORG: process.env.COOKIELAW_ORG,
  /** Needed for setting up full-story integration */
  FS_HOST: process.env.FS_HOST,
  FS_SCRIPT: process.env.FS_SCRIPT,
  FS_ORG: process.env.FS_ORG,
};

// this function replaces {{VARIABLE_NAME}} variables in the given string
export const prepareManagerHeadFile = (html: string) => {
  return html.replace(/{{(.*?)}}/g, (_, varName): string => {
    // Trim any extra spaces in the variable name
    varName = varName.trim();
    // If the variable exists in the object, replace it. Otherwise, return an empty string
    return envVars[varName] || '';
  });
};
