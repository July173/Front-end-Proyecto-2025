export interface Module {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface ModuleForm {
  name: string;
  form: import('./form.types').FormItem[];
}
