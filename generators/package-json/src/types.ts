export type CommandFlags = {
  dryRun: boolean;
  allWorkspacePackages: boolean;
};

export type GeneratorPackageJsonOptions = {
  workspaceRoot: string;
  dryRun: CommandFlags['dryRun'];
};
