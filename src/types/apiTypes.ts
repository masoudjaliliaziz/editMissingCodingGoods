export interface StringItem {
  id: string;
  stringNumber: number;
  color: string;
  colorCode?: string;
}

export interface ITableProps {
  parentCode: string | null | undefined;
  factorData: CustomerFactorItem[] | undefined;
}

export type IPreInvoiceItem = {
  Actionator: string | null;
  Amount: string | null;
  Attachments: boolean;
  AuthorId: number;
  Category: string | null;
  Color: string | null;
  Color2: string | null;
  strings?: StringItem[];
  stringCount?: number;
  UnitPrice?: string;
  PrintText?: string;
  ColorResult?: string;
  StageNumber?: string;
  PairNumber?: string;
  StripedColor?: string;
  StrandColor?: string;
  Row?: string;
  PrintCheckbox?: boolean;
  NoPrint?: boolean;
  StringCount?: string;
  ProductColor?: string;
  LastProductionStage?: string;
  IsSemiFinished?: boolean;
  ContentTypeId: string;
  Created: string;
  Customer: string | null;
  CustomerCode: string | null;
  Date: string | null;
  DayDelivary: string | null;
  DelivaryDate: string | null;
  Description: string | null;
  EditorId: number;
  FileSystemObjectType: number;
  GUID: string;
  Grade: string | null;
  ID: number;
  Id: number;
  Issue: string | null;
  MeasuiementUnit: string | null;
  Meter: string | null;
  Modified: string;
  NumberProgram: string | null;
  OData__UIVersionString: string;
  _x0070_1: string | null;
  _x0070_2: string | null;
  _x0070_3: string | null;
  _x0070_4: string | null;
  OldCode: string | null;
  OrderNumber: string | null;
  OriginalColor: string | null;
  Packing: string | null;
  Person: string | null;
  PhaseSection: string | null;
  Price: string | null;
  Print: string | null;
  Product: string | null;
  ProductDisplayName: string | null;
  ProductSize: string | null;
  Production: string | null;
  ProductionCode: string | null;
  ProgramNumber: string | null;
  Ran: string | null;
  RanMeter: string | null;
  Revised_Request: string | null;
  STW: string | null;
  Standard: string | null;
  StartDate: string | null;
  Status: string | null;
  StatusPrefactor: string | null;
  StringColor: string | null;
  StringColor_code: string | null;
  Structure: string | null;
  TextPrint: string | null;
  Title: string;
  Tolerance: string | null;
  UnitGoods: string | null;
  Value: string | null;
  Voltage: string | null;
  WFCreate: string | null;
  add: boolean;
  code_15r: string | null;
  codegoods: string | null;
  codemahsolemoshtari: string | null;
  coler_final_code: string | null;
  colertitle: string | null;
  color_difaltcode: string | null;
  cu: string | null;
  darsad_takhfif: string | null;
  date_c: string | null;
  date_k: string | null;
  goods_title: string | null;
  goodscode: string | null;
  idparent: string | null;
  marhaletolid_akharin: string | null;
  meghdarjahattolid: string | null;
  namegoods: string | null;
  nimesakhte: string | null;
  notview: string | null;
  packing_code: string | null;
  packing_name: string | null;
  parent_code: string | null;
  parent_ditaile_code: string | null;
  pidId: string | null;
  pidroutinId: string | null;
  rang_rokesh_code: string | null;
  rang_rows: string | null;
  rows: string | null;
  shomare_akharin: string | null;
  titlefrest: string | null;
  tu: string | null;
  typesOfVehicle: string | null;
};

export interface AgentItem {
  Title: string;
  ID: number;
}

export interface SharePointUser {
  Id: number;
  Title: string;
  LoginName: string;
  Email: string;
}

interface CurrentUserMetadata {
  id: string;
  type: string;
  uri: string;
}

interface CurrentUser {
  Email: string | null;
  LoginName: string;
  Title: string;
  __metadata: CurrentUserMetadata;
}

export interface CurrentUserResponse {
  d: CurrentUser;
}

export interface PersonnelListMetadata {
  etag: string;
  id: string;
  type: string;
  uri: string;
}

export type PersonnelListItem = {
  AccountId: number;
  Activeness: string | null;
  Attachments: boolean;
  AuthorId: number;
  CellPhone: string | null;
  CenterName: string | null;
  Comments: string | null;
  Company: string | null;
  ContentTypeId: string;
  Country: string | null;
  Created: string;
  DaysId: number | null;
  Department: string | null;
  EditorId: number;
  Email: string | null;
  FileSystemObjectType: number;
  FirstName: string | null;
  FullName: string | null;
  GUID: string;
  HomePhone: string | null;
  ID: number;
  Id: number;
  IncomingLetterOrder: number;
  InnerCall: string | null;
  JobTitle: string | null;
  MACHINESId: { results: number[] };
  Machinetxt: string | null;
  Manager0: string | null;
  ManagerUserNameTXT: string | null;
  Modified: string;
  OData__UIVersionString: string;
  OrganizationLevel: string | null;
  PersonnelCode: string | null;
  Picture: string | null;
  PureName: string | null;
  Title: string;
  UPDATEUS: string | null;
  URLPIC: string | null;
  Updateal: string | null;
  UserName: string;
  WebPage: string | null;
  WorkAddress: string | null;
  WorkCity: string | null;
  WorkFax: string | null;
  WorkPhone: string | null;
  WorkZip: string | null;
  monthId: number | null;
  sematmodir: string | null;
  yearsId: number | null;
  __metadata: PersonnelListMetadata;
};

export interface PersonnelListResponse {
  d: {
    results: PersonnelListItem[];
  };
}

export type CustomerFactorItem = {
  ApproveManagerFactor: string;
  Attachments: boolean;
  AuthorId: number;
  BankAccountvalue: string | null;
  CROM_ITEM_GUID: string | null;
  CodeID: number;
  ContentTypeId: string;
  CreateLC: number;
  Created: string;
  Customer: string;
  CustomerCode: string;
  Customer_GUID: string | null;
  Date: string;
  EDIT_AFTER_T: boolean;
  EditorId: number;
  Email: string;
  FileSystemObjectType: number;
  FirstUser: string;
  FirstUser_name: string | null;
  FirstUser_semat: string | null;
  GUID: string;
  ID: number;
  Id: number;
  MainTotakTICU: number;
  MainTotalCu: number;
  Modified: string;
  OData__UIVersionString: string;
  ParentList?: unknown;
  Result: string | null;
  STOP: boolean;
  STW: number;
  SendToCR: string | null;
  Status: string;
  Subject: string | null;
  Tarikhetebar: string | null;
  Title: string;
  VersionCode: number;
  Web_Service: string | null;
  Year: number;
  adres: string | null;
  assignId: string | null;
  assign_txt: string | null;
  avarez: string;
  chaptopishfactor: boolean;
  code_show: boolean;
  codeposti: string | null;
  dakheli: string;
  darsad_takhfif: string;
  excle: boolean;
  lasttime: string;
  linckitemsinputtajmi: string | null;
  mablaghkolbehorof: string;
  mabnavalue: string | null;
  majmoemetraj: string;
  manager_acId: string | null;
  managername: string;
  managertext: string;
  moshtarisemat: string | null;
  moshtarishakhs: string | null;
  nahai: boolean;
  name_peyghirikonande: string;
  nazarmohandesi: string;
  semat_peyghirikonande: string;
  sematmodir: string;
  senariogheymat: string | null;
  send_factor: boolean;
  sendemai: number;
  shenasemeli: string | null;
  shomareeghtesadi: string | null;
  shomaresabt: string | null;
  tadilaz: string | null;
  tadilgheymat: boolean;
  tadilgheymattaiid: boolean;
  tadilshode: boolean;
  takhfif: string;
  tarikheblagh: string | null;
  tarikhersalbekarkhane: string;
  tarikhgoshayesh: string | null;
  tarikhmabnavalue: string | null;
  telefon: string | null;
  test: string | null;
  timetahvil: string | null;
  tolerance_manfi: string | null;
  tolerance_mosbat: string | null;
  total_SUM: string;
  total_mani: string;
  tozihat: string;
  type_factor: string;
  unofficial: boolean;
  year_mon: string;
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: string;
  };
};

// ====== تایپ بسته بندی =======
export interface IPackingListItem {
  ID: number;
  Id: number;
  Title: string;
  code_cating: string;
  code_packing: string;
  code_packing2: string;
  code_packing3: string;
  jens: string | null;
  size: string | null;
  typebaste: string;
  AuthorId: number;
  EditorId: number;
  Created: string;
  Modified: string;
  ContentTypeId: string;
  GUID: string;
  OData__UIVersionString: string;
  FileSystemObjectType: number;
  Attachments: boolean;
}

// ====== تایپ چاپ =======
export interface IPrintListItem {
  ID: number;
  Id: number;
  Title: string;
  Code: string;
  Description: string;
  Text: string;
  Production: string;
  Search: string;
  SearchCustomer: string | null;
  Status: string | null;
  WFPrint: string | null;
  chapp: string | null;
  deleteOl: string | null;
  ParentId: number;
  ParentLevel: number | null;
  AuthorId: number;
  EditorId: number;
  Created: string;
  Modified: string;
  ContentTypeId: string;
  GUID: string;
  OData__UIVersionString: string;
  FileSystemObjectType: number;
  Attachments: boolean;
}

// ====== تایپ محصول =======
export interface IProductListItem {
  tedadrang: string;
  ID: number;
  Id: number;
  Title: string;
  code: number;
  code_moadian: string;
  codegroh: string;
  ProductCode: string;
  ProductName: string;
  ProductType: string;
  PureName: string;
  TechnicalNAmeOfConductor: string;
  TechnicalNameOfVehicle: string;
  TypeOfVehicle: string;
  NameOfVehicle: string;
  ConductorSection: string;
  ConductorString: number;
  UnitOfConductor: string | null;
  SectionOfSize: string;
  Unit1: string;
  Unit2: string;
  UnitOfSize: string;
  String: number;
  StringOfSize: number;
  onvangroup: string;
  sharhmahsolbarayefactor: string;
  maghta: string;
  rangamade: string | null;
  vahedshomaresh: string;
  tesadreshte: string;
  Category: string;
  Description: string | null;
  Status: string | null;
  Customer: string | null;
  TechnicalSize: string | null;
  BrightnessSectionOfAluminium?: string | null;
  Color0?: string | null;
  Feasibility?: string | null;
  Name?: string | null;
  Multiple?: string | null;
  TechnicalDescription0?: string | null;
  Created: string;
  Modified: string;
  AuthorId: number;
  EditorId: number;
  GUID: string;
  ContentTypeId: string;
  OData__UIVersionString: string;
  FileSystemObjectType: number;
  Attachments: boolean;
}

// ====== تایپ رنگ =======
export interface SharePointItem {
  ID: number;
  Id: number;
  Title: string;
  class: string | null;
  color_code: string;
  couple_code: string;
  shomarezoj: string;
  AuthorId: number;
  EditorId: number;
  Created: string;
  Modified: string;
  ContentTypeId: string;
  GUID: string;
  OData__UIVersionString: string;
  FileSystemObjectType: number;
  Attachments: boolean;
}

export interface IColorGoodsListItem {
  ID: number;
  Title: string;
  coding: string;
}

// ====== تایپ کدینگ محصول =======
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

// ======= تایپ تغییرات پیش‌فاکتور =======
export type ChangePreInvoiceHistoryItem = {
  Title: string;
  printTitle: string;
  printType: string;
  productTittle: string;
  colorFinalCode: string;
  colorTitle: string;
  packingTitle: string;
  preInvoiceProductTitle: string;
  finalGenerationCode: string;
  finalProductCode: string;
  packingCode: string;
  orderNumber: string;
  orderNumberRow: string;
  productCode: string;
  amount: string;
  productionAmount: string;
  price: string;
  totalPrice: string;
  productCatgory: string;
  status: string;
  coverColor: string;
  colorString: string;
  packingTittle: string;
  customerName: string;
  customerCode: string;
  preInvoiceCreateDate: string;
  packingType: string;
  packingMaterial: string;
  packingSize: string;
  packingM: string;
  STW: string;
};

// ======= تایپ بسته بندی سفارشی =======
export interface IBastebandiSefareshListItem {
  Id: number;
  Title?: string;
  Attachments: boolean;
  AuthorId: number;
  ContentTypeId: string;
  Created: string | Date;
  EditorId: number;
  FileSystemObjectType: number;
  GUID: string;
  OData__UIVersionString: string;
  add: boolean;
  bastebandie: string;
  chap?: string;
  codegoods?: string | null;
  codemahsol: string;
  codemoshtari: string;
  jensebaste?: string | null;
  meghdarbarnamerizitakonon?: string | null;
  metraj: string;
  metrajtahvili?: string | null;
  metrebaste: string;
  moshtari?: string | null;
  name: string;
  namegoods?: string | null;
  rang: string;
  rangrokesh?: string | null;
  shomarefactor: string;
  shomarefactor0: string;
  shomaretarh: string;
  sizebaste?: string | null;
  sodorcart: boolean;
  tarikhsefaresh: string;
  tozihat?: string | null;
  typebaste: string;
}

// ======= تایپ پیشرفت مراحل تولید =======
export interface IPishrafteMaraheleTolidListItem {
  Id: number;
  Title?: string; // مثلاً "4-70698-1"
  Attachments: boolean; // مثلاً false
  AuthorId: number; // مثلاً 1073741823
  ContentTypeId: string; // مثلاً "0x010077EC5E221B3ECE4E9E6D9993F1701BF2"
  Created: string | Date; // مثلاً "2025-09-27T08:50:35Z"
  EditorId: number; // مثلاً 1073741823
  FileSystemObjectType: number; // مثلاً 0
  GUID: string; // مثلاً "507e64cc-fe31-4e58-bb58-af7ac9cb2c29"
  OData__UIVersionString: string; // مثلاً "1.0"
  OData__x06cc__x0628__x0627__x0631_?: string | null; // مثلاً null
  OData__x0622__x062e__x0631__x06cc__x06?: string | null; // مثلاً null
  TEST?: string | null; // مثلاً null
  Value?: string | null; // مثلاً null
  akharinmarhale: boolean; // مثلاً true
  arzenavar?: string | null; // مثلاً null
  arzenavaralminiom?: string | null; // مثلاً null
  arzenavarmailar?: string | null; // مثلاً null
  barnamerizishode: boolean; // مثلاً false
  bastebandi: string; // مثلاً "حلقه  100 متری"
  chidemanreshtelayeha?: string | null; // مثلاً null
  chidemanreshtelayeha2?: string | null; // مثلاً null
  chidemanreshtelayeha3?: string | null; // مثلاً null
  chidemanreshtelayeham?: string | null; // مثلاً null
  codeekhtesari: string; // مثلاً "2726"
  codemahsol: string; // مثلاً "1732-300/500-CU\\SILICON/IE2-1x1(mm2)-سیم افشان-سیلیکون-ازمایشی"
  date?: string | null; // مثلاً null
  datesefaresh: string; // مثلاً "1404/06/29"
  diff: string; // مثلاً "4000.00000000000"
  ghotremaftolfoladi?: string | null; // مثلاً null
  ghotrereshte?: string | null; // مثلاً null
  halatekeshesh?: string | null; // مثلاً null
  idakharinbarnamerizi?: string | null; // مثلاً null
  idlevel: string; // مثلاً "6228"
  idproductionPlanproductgroup1: string; // مثلاً "1047"
  jahatetab?: string | null; // مثلاً null
  jahattab2?: string | null; // مثلاً null
  jahattab3?: string | null; // مثلاً null
  jahattabm?: string | null; // مثلاً null
  marhaletolid: string; // مثلاً "عایق"
  matnechap?: string; // مثلاً "null"
  maxghotreayeghshode: string; // مثلاً "2.67"
  maxghotrershte?: string | null; // مثلاً null
  maxtoltab?: string | null; // مثلاً null
  maxtoltabmarkaz?: string | null; // مثلاً null
  meghdarbarnamerizitakonon: number; // مثلاً 0
  mindama?: string | null; // مثلاً null
  minghotreayeghshode: string; // مثلاً "2.57"
  minghotrershte?: string | null; // مثلاً null
  minrotobat?: string | null; // مثلاً null
  mintoltab?: string | null; // مثلاً null
  mintoltabmarkaz?: string | null; // مثلاً null
  namedastgah: string; // مثلاً "EX Silicon"
  namemoshtari: string; // مثلاً "آقای قویدل"
  nameoperator?: string | null; // مثلاً null
  poshesh?: string | null; // مثلاً null
  rangbandi: string; // مثلاً "مشکی - "
  rangrokesh?: string | null; // مثلاً null
  sazeghaleb: string; // مثلاً "2.62"
  shomaremarhale: string; // مثلاً "4"
  shomaresefaresh: string; // مثلاً "4-70698-1-4"
  shomaretarh: string; // مثلاً "1732"
  shomareverjen: string; // مثلاً "1"
  size: string; // مثلاً "1x1(mm2)"
  sizenazel: string; // مثلاً "1.34"
  sizesimert?: string | null; // مثلاً null
  tarikhbarnamerizighabli?: string | null; // مثلاً null
  tedadarmor?: string | null; // مثلاً null
  tedadmaftolfoladi?: string | null; // مثلاً null
  tedadreshte?: string | null; // مثلاً null
  tedadreshtebarayemarahel?: string | null; // مثلاً null
  tedadvaghotreshte?: string | null; // مثلاً null
  tolidbarnamei: number; // مثلاً 4000
  tolidvaghei: number; // مثلاً 0
  toltabmax2?: string | null; // مثلاً null
  toltabmax3?: string | null; // مثلاً null
  toltabmin2?: string | null; // مثلاً null
  toltabmin3?: string | null; // مثلاً null
  tozihat?: string | null; // مثلاً null
  typelevel?: string | null; // مثلاً null
  typename: string; // مثلاً "برق و قدرت"
  typesefaresh: string; // مثلاً "سیم"
  vijegikhas: string; // مثلاً "سیلیکون-ازمایشی"
  zamanotaghbokhar?: string | null; // مثلاً null
  zaribtab?: string | null; // مثلاً null
  zekhamatenavaralminiom?: string | null; // مثلاً null
  zekhamatmotevaset: string; // مثلاً "0.7"
  zekhamatnavarmailar?: string | null; // مثلاً null
  zekhamatnoghtei: string; // مثلاً "0.53"
}
