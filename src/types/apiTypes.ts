export interface ICodingGoodsListItem {
  Attachments: boolean;
  AuthorId: number;
  ContentTypeId: string;
  Created: Date | string;
  EditorId: number;
  FileSystemObjectType: number;
  GUID: string;
  ID: number;
  Id: number;
  Modified: Date | string;
  OData__UIVersionString: string;
  OData__x0031_y: string;
  OData__x062a__x06a9__x0645__x06cc__x06: number;
  PartCode: string;
  TYPES: string;
  Title: string;
  Updated: boolean;
  Updated_c: string;
  arzeshafzode: string;
  check: boolean;
  code_moadian: string;
  codearman: string | null;
  codeesnova: string | null;
  codefani: string;
  codegroh: string;
  codegroup: string;
  codemgroup: string;
  codesaze: string | null;
  codevahed: string;
  coding: string;
  emailcre: number;
  excel: boolean;
  group: string;
  onvangroup: string;
  rang: string;
  sharhesnova: string | null;
  sharhmahsolbarayefactor: string;
  testt: number;
  vahedshomaresh: string;
}

export interface IUseEditFieldReturn {
  editingValue: string;
  isEditing: boolean;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  setEditingValue: (value: string) => void;
  isSaving: boolean;
}

export interface IUpdateCodingGoodsParams {
  itemId: number;
  updates: Partial<ICodingGoodsListItem>;
}

export interface ISearchableSelectProps {
  options: ICodingGoodsListItem[];
  value: ICodingGoodsListItem | null;
  onChange: (option: ICodingGoodsListItem | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface ILoadOptions {
  searchTerm?: string;
  filterFields?: string[];
}
