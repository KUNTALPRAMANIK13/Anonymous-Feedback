// Export all type definitions
export * from "./apiResponse";
export * from "./next-auth";
export * from "./forms";
export * from "./components";
export * from "./database";
export * from "./environment";

// Re-export commonly used types
export type {
  ApiResponse,
  AuthApiResponse,
  MessageApiResponse,
  AcceptMessageApiResponse,
  UsernameCheckApiResponse,
  SuggestMessagesApiResponse,
  ErrorApiResponse,
  SuccessApiResponse,
  UserApiResponse,
  VerificationApiResponse,
  PasswordChangeApiResponse,
  RecruiterApiResponse,
  AnyApiResponse,
} from "./apiResponse";

export type {
  ExtendedUser,
  ExtendedSession,
  ExtendedJWT,
} from "./next-auth";

export type {
  SignUpFormData,
  SignInFormData,
  MessageFormData,
  VerifyFormData,
  AcceptMessageFormData,
  CheckEmailFormData,
  ChangePasswordFormData,
  FormValidationState,
  FormSubmissionState,
} from "./forms";

export type {
  MessageCardProps,
  NavbarProps,
  FormProps,
  ButtonProps,
  InputProps,
  TextareaProps,
  CardProps,
  AlertDialogProps,
  SwitchProps,
  CheckboxProps,
  LabelProps,
  SeparatorProps,
  CarouselProps,
  InputOTPProps,
  ToastProps,
  LoadingState,
  PaginationProps,
  SearchProps,
  ModalProps,
  DropdownProps,
  TooltipProps,
} from "./components";

export type {
  UserDocument,
  MessageDocument,
  BaseDocument,
  DatabaseConnection,
  QueryOptions,
  UpdateOptions,
  DatabaseOperationResult,
  CreateUserData,
  UpdateUserData,
  CreateMessageData,
  UpdateMessageData,
  DatabaseIndex,
  ValidationRule,
  SchemaDefinition,
  TransactionOptions,
  ConnectionOptions,
  DatabaseStats,
  DatabaseHealth,
  DatabaseBackup,
  DatabaseMigration,
} from "./database";

export type {
  EnvironmentVariables,
  EnvironmentValidation,
  AppConfig,
  FeatureFlags,
  ApiConfig,
  EmailConfig,
  AIConfig,
  DatabaseConfig,
  LoggingConfig,
  MonitoringConfig,
  CacheConfig,
  FileUploadConfig,
} from "./environment";
