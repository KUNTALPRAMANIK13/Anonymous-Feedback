import { ReactNode } from "react";
import { Message } from "@/models/Messages.model";

// Base component props
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

// MessageCard component props
export interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

// Navbar component props
export interface NavbarProps extends BaseComponentProps {}

// Form component props
export interface FormProps<T = any> extends BaseComponentProps {
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  validationSchema?: any;
}

// Button component props
export interface ButtonProps extends BaseComponentProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

// Input component props
export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  name?: string;
  id?: string;
}

// Textarea component props
export interface TextareaProps extends BaseComponentProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  name?: string;
  id?: string;
}

// Card component props
export interface CardProps extends BaseComponentProps {
  variant?: "default" | "outlined";
}

export interface CardHeaderProps extends BaseComponentProps {}

export interface CardContentProps extends BaseComponentProps {}

export interface CardFooterProps extends BaseComponentProps {}

// Alert Dialog props
export interface AlertDialogProps extends BaseComponentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface AlertDialogTriggerProps extends BaseComponentProps {}

export interface AlertDialogContentProps extends BaseComponentProps {}

export interface AlertDialogHeaderProps extends BaseComponentProps {}

export interface AlertDialogTitleProps extends BaseComponentProps {}

export interface AlertDialogDescriptionProps extends BaseComponentProps {}

export interface AlertDialogFooterProps extends BaseComponentProps {}

export interface AlertDialogActionProps extends BaseComponentProps {
  onClick?: () => void;
}

export interface AlertDialogCancelProps extends BaseComponentProps {}

// Switch component props
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
}

// Checkbox component props
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

// Label component props
export interface LabelProps extends BaseComponentProps {
  htmlFor?: string;
}

// Separator component props
export interface SeparatorProps extends BaseComponentProps {
  orientation?: "horizontal" | "vertical";
}

// Carousel component props
export interface CarouselProps extends BaseComponentProps {
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
    containScroll?: "trimSnaps" | "keepSnaps" | "loose";
  };
  plugins?: any[];
}

export interface CarouselContentProps extends BaseComponentProps {}

export interface CarouselItemProps extends BaseComponentProps {
  className?: string;
}

export interface CarouselPreviousProps extends BaseComponentProps {}

export interface CarouselNextProps extends BaseComponentProps {}

// OTP Input props
export interface InputOTPProps extends BaseComponentProps {
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export interface InputOTPGroupProps extends BaseComponentProps {}

export interface InputOTPSlotProps extends BaseComponentProps {
  index: number;
}

// Toast props
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Pagination props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Search props
export interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Modal props
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

// Dropdown props
export interface DropdownProps extends BaseComponentProps {
  trigger: ReactNode;
  items: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  value: string;
  onClick?: () => void;
  disabled?: boolean;
}

// Tooltip props
export interface TooltipProps extends BaseComponentProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}
