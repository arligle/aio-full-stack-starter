import { Type } from "class-transformer";
import { SamlConfig } from "./saml.config";
import { ValidateNested } from "class-validator";


export default class RootConfig {
  // @Type(() => LoggerConfig)
  // @ValidateNested()
  // public readonly logs!: LoggerConfig;

  // @Type(() => AuthConfig)
  // @ValidateNested()
  // public readonly auth!: AuthConfig;

  // @Type(() => AppConfig)
  // @ValidateNested()
  // public readonly app!: AppConfig;

  // @Type(() => SwaggerConfig)
  // @ValidateNested()
  // public readonly swagger!: SwaggerConfig;

  // @Type(() => I18Config)
  // @ValidateNested()
  // public readonly i18!: I18Config;

  // @Type(() => DbConfig)
  // @ValidateNested()
  // public readonly db!: DbConfig;

  // @Type(() => HealthConfig)
  // @ValidateNested()
  // public readonly health!: HealthConfig;

  @Type(() => SamlConfig)
  @ValidateNested()
  public readonly saml!: SamlConfig;
}
