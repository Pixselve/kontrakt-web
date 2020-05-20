export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  token: Scalars['String'];
  teacher: Teacher;
};

export type Color = {
   __typename?: 'Color';
  id: Scalars['Int'];
  name: Scalars['String'];
  rgb: Scalars['String'];
  skillsStatuses?: Maybe<Array<SkillStatus>>;
};


export type ColorSkillsStatusesArgs = {
  where?: Maybe<SkillStatusWhereInput>;
  orderBy?: Maybe<SkillStatusOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillStatusWhereUniqueInput>;
  before?: Maybe<SkillStatusWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ColorCreateInput = {
  name: Scalars['String'];
  rgb: Scalars['String'];
  skillsStatuses?: Maybe<SkillStatusCreateManyWithoutColorInput>;
};

export type ColorCreateOneWithoutSkillsStatusesInput = {
  create?: Maybe<ColorCreateWithoutSkillsStatusesInput>;
  connect?: Maybe<ColorWhereUniqueInput>;
};

export type ColorCreateWithoutSkillsStatusesInput = {
  name: Scalars['String'];
  rgb: Scalars['String'];
};

export type ColorOrderByInput = {
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  rgb?: Maybe<OrderByArg>;
};

export type ColorUpdateOneRequiredWithoutSkillsStatusesInput = {
  create?: Maybe<ColorCreateWithoutSkillsStatusesInput>;
  connect?: Maybe<ColorWhereUniqueInput>;
  update?: Maybe<ColorUpdateWithoutSkillsStatusesDataInput>;
  upsert?: Maybe<ColorUpsertWithoutSkillsStatusesInput>;
};

export type ColorUpdateWithoutSkillsStatusesDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  rgb?: Maybe<Scalars['String']>;
};

export type ColorUpsertWithoutSkillsStatusesInput = {
  update: ColorUpdateWithoutSkillsStatusesDataInput;
  create: ColorCreateWithoutSkillsStatusesInput;
};

export type ColorWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  rgb?: Maybe<StringFilter>;
  skillsStatuses?: Maybe<SkillStatusFilter>;
  AND?: Maybe<Array<ColorWhereInput>>;
  OR?: Maybe<Array<ColorWhereInput>>;
  NOT?: Maybe<Array<ColorWhereInput>>;
};

export type ColorWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Contract = {
   __typename?: 'Contract';
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  skills?: Maybe<Array<Skill>>;
};


export type ContractSkillsArgs = {
  where?: Maybe<SkillWhereInput>;
  orderBy?: Maybe<SkillOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillWhereUniqueInput>;
  before?: Maybe<SkillWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ContractCreateOneWithoutSkillsInput = {
  create?: Maybe<ContractCreateWithoutSkillsInput>;
  connect?: Maybe<ContractWhereUniqueInput>;
};

export type ContractCreateWithoutSkillsInput = {
  date: Scalars['DateTime'];
};

export type ContractOrderByInput = {
  date?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
};

export type ContractUpdateInput = {
  date?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  skills?: Maybe<SkillUpdateManyWithoutContractInput>;
};

export type ContractUpdateOneRequiredWithoutSkillsInput = {
  create?: Maybe<ContractCreateWithoutSkillsInput>;
  connect?: Maybe<ContractWhereUniqueInput>;
  update?: Maybe<ContractUpdateWithoutSkillsDataInput>;
  upsert?: Maybe<ContractUpsertWithoutSkillsInput>;
};

export type ContractUpdateWithoutSkillsDataInput = {
  date?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
};

export type ContractUpsertWithoutSkillsInput = {
  update: ContractUpdateWithoutSkillsDataInput;
  create: ContractCreateWithoutSkillsInput;
};

export type ContractWhereInput = {
  date?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  skills?: Maybe<SkillFilter>;
  AND?: Maybe<Array<ContractWhereInput>>;
  OR?: Maybe<Array<ContractWhereInput>>;
  NOT?: Maybe<Array<ContractWhereInput>>;
};

export type ContractWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type CreateOneContractInput = {
  date: Scalars['DateTime'];
  skills: Array<Scalars['String']>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type DeleteStudentInput = {
  id: Scalars['Int'];
};

export type EditOrCreateSkillToStudentInput = {
  mark: Mark;
  student: StudentWhereUniqueInput;
  skill: SkillWhereUniqueInput;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type LoginTeacherInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum Mark {
  AwaitingCorrection = 'AWAITING_CORRECTION',
  Green = 'GREEN',
  Marked = 'MARKED',
  Orange = 'ORANGE',
  Red = 'RED',
  Blue = 'BLUE',
  Todo = 'TODO',
  ToFinish = 'TO_FINISH'
}

export type MarkFilter = {
  equals?: Maybe<Mark>;
  not?: Maybe<Mark>;
  in?: Maybe<Array<Mark>>;
  notIn?: Maybe<Array<Mark>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createTeacher: AuthPayload;
  loginTeacher: AuthPayload;
  checkIsStudentExists: Scalars['Boolean'];
  createOneContract: Contract;
  removeOneContract: Contract;
  deleteStudent: Student;
  editOrCreateSkillToStudent: SkillToStudent;
  deleteOneContract?: Maybe<Contract>;
  updateOneContract?: Maybe<Contract>;
  createOneSkill: Skill;
  deleteOneSkill?: Maybe<Skill>;
  updateOneSkill?: Maybe<Skill>;
  createOneStudent: Student;
  updateOneStudent?: Maybe<Student>;
  createOneSkillStatus: SkillStatus;
  deleteOneSkillStatus?: Maybe<SkillStatus>;
  updateOneSkillStatus?: Maybe<SkillStatus>;
  createOneColor: Color;
  deleteOneColor?: Maybe<Color>;
  loginStudent: StudentAuthPayload;
  loginStudentOld: StudentAuthPayload;
};


export type MutationCreateTeacherArgs = {
  data: TeacherCreateInputCustom;
};


export type MutationLoginTeacherArgs = {
  data: LoginTeacherInput;
};


export type MutationCheckIsStudentExistsArgs = {
  id: Scalars['Float'];
};


export type MutationCreateOneContractArgs = {
  data: CreateOneContractInput;
};


export type MutationRemoveOneContractArgs = {
  data: RemoveOneContractInput;
};


export type MutationDeleteStudentArgs = {
  data: DeleteStudentInput;
};


export type MutationEditOrCreateSkillToStudentArgs = {
  data: EditOrCreateSkillToStudentInput;
};


export type MutationDeleteOneContractArgs = {
  where: ContractWhereUniqueInput;
};


export type MutationUpdateOneContractArgs = {
  data: ContractUpdateInput;
  where: ContractWhereUniqueInput;
};


export type MutationCreateOneSkillArgs = {
  data: SkillCreateInput;
};


export type MutationDeleteOneSkillArgs = {
  where: SkillWhereUniqueInput;
};


export type MutationUpdateOneSkillArgs = {
  data: SkillUpdateInput;
  where: SkillWhereUniqueInput;
};


export type MutationCreateOneStudentArgs = {
  data: StudentCreateInput;
};


export type MutationUpdateOneStudentArgs = {
  data: StudentUpdateInput;
  where: StudentWhereUniqueInput;
};


export type MutationCreateOneSkillStatusArgs = {
  data: SkillStatusCreateInput;
};


export type MutationDeleteOneSkillStatusArgs = {
  where: SkillStatusWhereUniqueInput;
};


export type MutationUpdateOneSkillStatusArgs = {
  data: SkillStatusUpdateInput;
  where: SkillStatusWhereUniqueInput;
};


export type MutationCreateOneColorArgs = {
  data: ColorCreateInput;
};


export type MutationDeleteOneColorArgs = {
  where: ColorWhereUniqueInput;
};


export type MutationLoginStudentArgs = {
  username: Scalars['Int'];
};


export type MutationLoginStudentOldArgs = {
  id: Scalars['Float'];
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
   __typename?: 'Query';
  contractsToExcel: Scalars['String'];
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  skill?: Maybe<Skill>;
  skills: Array<Skill>;
  student?: Maybe<Student>;
  me: User;
  students: Array<Student>;
  skillStatus?: Maybe<SkillStatus>;
  skillStatuses: Array<SkillStatus>;
  color?: Maybe<Color>;
  colors: Array<Color>;
};


export type QueryContractArgs = {
  where: ContractWhereUniqueInput;
};


export type QueryContractsArgs = {
  where?: Maybe<ContractWhereInput>;
  orderBy?: Maybe<ContractOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ContractWhereUniqueInput>;
  before?: Maybe<ContractWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySkillArgs = {
  where: SkillWhereUniqueInput;
};


export type QuerySkillsArgs = {
  where?: Maybe<SkillWhereInput>;
  orderBy?: Maybe<SkillOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillWhereUniqueInput>;
  before?: Maybe<SkillWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type QueryStudentsArgs = {
  where?: Maybe<StudentWhereInput>;
  orderBy?: Maybe<StudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<StudentWhereUniqueInput>;
  before?: Maybe<StudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySkillStatusArgs = {
  where: SkillStatusWhereUniqueInput;
};


export type QuerySkillStatusesArgs = {
  where?: Maybe<SkillStatusWhereInput>;
  orderBy?: Maybe<SkillStatusOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillStatusWhereUniqueInput>;
  before?: Maybe<SkillStatusWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryColorArgs = {
  where: ColorWhereUniqueInput;
};


export type QueryColorsArgs = {
  where?: Maybe<ColorWhereInput>;
  orderBy?: Maybe<ColorOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ColorWhereUniqueInput>;
  before?: Maybe<ColorWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type RemoveOneContractInput = {
  id: Scalars['Int'];
};

export type Skill = {
   __typename?: 'Skill';
  id: Scalars['Int'];
  name: Scalars['String'];
  contractId: Scalars['Int'];
  skillToStudents?: Maybe<Array<SkillToStudent>>;
  contract: Contract;
};


export type SkillSkillToStudentsArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
  orderBy?: Maybe<SkillToStudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillToStudentWhereUniqueInput>;
  before?: Maybe<SkillToStudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SkillCreateInput = {
  name: Scalars['String'];
  skillToStudents?: Maybe<SkillToStudentCreateManyWithoutSkillInput>;
  contract: ContractCreateOneWithoutSkillsInput;
};

export type SkillCreateOneWithoutSkillToStudentsInput = {
  create?: Maybe<SkillCreateWithoutSkillToStudentsInput>;
  connect?: Maybe<SkillWhereUniqueInput>;
};

export type SkillCreateWithoutContractInput = {
  name: Scalars['String'];
  skillToStudents?: Maybe<SkillToStudentCreateManyWithoutSkillInput>;
};

export type SkillCreateWithoutSkillToStudentsInput = {
  name: Scalars['String'];
  contract: ContractCreateOneWithoutSkillsInput;
};

export type SkillFilter = {
  every?: Maybe<SkillWhereInput>;
  some?: Maybe<SkillWhereInput>;
  none?: Maybe<SkillWhereInput>;
};

export type SkillOrderByInput = {
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  contractId?: Maybe<OrderByArg>;
};

export type SkillScalarWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  skillToStudents?: Maybe<SkillToStudentFilter>;
  contractId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillScalarWhereInput>>;
  OR?: Maybe<Array<SkillScalarWhereInput>>;
  NOT?: Maybe<Array<SkillScalarWhereInput>>;
};

export type SkillStatus = {
   __typename?: 'SkillStatus';
  id: Scalars['Int'];
  mark: Mark;
  text: Scalars['String'];
  colorId: Scalars['Int'];
  color: Color;
};

export type SkillStatusCreateInput = {
  mark: Mark;
  text: Scalars['String'];
  color: ColorCreateOneWithoutSkillsStatusesInput;
};

export type SkillStatusCreateManyWithoutColorInput = {
  create?: Maybe<Array<SkillStatusCreateWithoutColorInput>>;
  connect?: Maybe<Array<SkillStatusWhereUniqueInput>>;
};

export type SkillStatusCreateWithoutColorInput = {
  mark: Mark;
  text: Scalars['String'];
};

export type SkillStatusFilter = {
  every?: Maybe<SkillStatusWhereInput>;
  some?: Maybe<SkillStatusWhereInput>;
  none?: Maybe<SkillStatusWhereInput>;
};

export type SkillStatusOrderByInput = {
  id?: Maybe<OrderByArg>;
  mark?: Maybe<OrderByArg>;
  text?: Maybe<OrderByArg>;
  colorId?: Maybe<OrderByArg>;
};

export type SkillStatusUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
  text?: Maybe<Scalars['String']>;
  color?: Maybe<ColorUpdateOneRequiredWithoutSkillsStatusesInput>;
};

export type SkillStatusWhereInput = {
  id?: Maybe<IntFilter>;
  mark?: Maybe<MarkFilter>;
  text?: Maybe<StringFilter>;
  colorId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillStatusWhereInput>>;
  OR?: Maybe<Array<SkillStatusWhereInput>>;
  NOT?: Maybe<Array<SkillStatusWhereInput>>;
  color?: Maybe<ColorWhereInput>;
};

export type SkillStatusWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type SkillToStudent = {
   __typename?: 'SkillToStudent';
  id: Scalars['Int'];
  mark: Mark;
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
  skill?: Maybe<Skill>;
  student?: Maybe<Student>;
};

export type SkillToStudentCreateManyWithoutSkillInput = {
  create?: Maybe<Array<SkillToStudentCreateWithoutSkillInput>>;
  connect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
};

export type SkillToStudentCreateManyWithoutStudentInput = {
  create?: Maybe<Array<SkillToStudentCreateWithoutStudentInput>>;
  connect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
};

export type SkillToStudentCreateWithoutSkillInput = {
  mark?: Maybe<Mark>;
  student: StudentCreateOneWithoutSkillToStudentsInput;
};

export type SkillToStudentCreateWithoutStudentInput = {
  mark?: Maybe<Mark>;
  skill: SkillCreateOneWithoutSkillToStudentsInput;
};

export type SkillToStudentFilter = {
  every?: Maybe<SkillToStudentWhereInput>;
  some?: Maybe<SkillToStudentWhereInput>;
  none?: Maybe<SkillToStudentWhereInput>;
};

export type SkillToStudentOrderByInput = {
  id?: Maybe<OrderByArg>;
  mark?: Maybe<OrderByArg>;
  skillId?: Maybe<OrderByArg>;
  studentId?: Maybe<OrderByArg>;
};

export type SkillToStudentScalarWhereInput = {
  id?: Maybe<IntFilter>;
  mark?: Maybe<MarkFilter>;
  skillId?: Maybe<IntFilter>;
  studentId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  OR?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  NOT?: Maybe<Array<SkillToStudentScalarWhereInput>>;
};

export type SkillToStudentUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
};

export type SkillToStudentUpdateManyWithoutSkillInput = {
  create?: Maybe<Array<SkillToStudentCreateWithoutSkillInput>>;
  connect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  set?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  disconnect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  delete?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  update?: Maybe<Array<SkillToStudentUpdateWithWhereUniqueWithoutSkillInput>>;
  updateMany?: Maybe<Array<SkillToStudentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  upsert?: Maybe<Array<SkillToStudentUpsertWithWhereUniqueWithoutSkillInput>>;
};

export type SkillToStudentUpdateManyWithoutStudentInput = {
  create?: Maybe<Array<SkillToStudentCreateWithoutStudentInput>>;
  connect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  set?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  disconnect?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  delete?: Maybe<Array<SkillToStudentWhereUniqueInput>>;
  update?: Maybe<Array<SkillToStudentUpdateWithWhereUniqueWithoutStudentInput>>;
  updateMany?: Maybe<Array<SkillToStudentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  upsert?: Maybe<Array<SkillToStudentUpsertWithWhereUniqueWithoutStudentInput>>;
};

export type SkillToStudentUpdateManyWithWhereNestedInput = {
  where: SkillToStudentScalarWhereInput;
  data: SkillToStudentUpdateManyDataInput;
};

export type SkillToStudentUpdateWithoutSkillDataInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
  student?: Maybe<StudentUpdateOneRequiredWithoutSkillToStudentsInput>;
};

export type SkillToStudentUpdateWithoutStudentDataInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
  skill?: Maybe<SkillUpdateOneRequiredWithoutSkillToStudentsInput>;
};

export type SkillToStudentUpdateWithWhereUniqueWithoutSkillInput = {
  where: SkillToStudentWhereUniqueInput;
  data: SkillToStudentUpdateWithoutSkillDataInput;
};

export type SkillToStudentUpdateWithWhereUniqueWithoutStudentInput = {
  where: SkillToStudentWhereUniqueInput;
  data: SkillToStudentUpdateWithoutStudentDataInput;
};

export type SkillToStudentUpsertWithWhereUniqueWithoutSkillInput = {
  where: SkillToStudentWhereUniqueInput;
  update: SkillToStudentUpdateWithoutSkillDataInput;
  create: SkillToStudentCreateWithoutSkillInput;
};

export type SkillToStudentUpsertWithWhereUniqueWithoutStudentInput = {
  where: SkillToStudentWhereUniqueInput;
  update: SkillToStudentUpdateWithoutStudentDataInput;
  create: SkillToStudentCreateWithoutStudentInput;
};

export type SkillToStudentWhereInput = {
  id?: Maybe<IntFilter>;
  mark?: Maybe<MarkFilter>;
  skillId?: Maybe<IntFilter>;
  studentId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillToStudentWhereInput>>;
  OR?: Maybe<Array<SkillToStudentWhereInput>>;
  NOT?: Maybe<Array<SkillToStudentWhereInput>>;
  skill?: Maybe<SkillWhereInput>;
  student?: Maybe<StudentWhereInput>;
};

export type SkillToStudentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type SkillUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  skillToStudents?: Maybe<SkillToStudentUpdateManyWithoutSkillInput>;
  contract?: Maybe<ContractUpdateOneRequiredWithoutSkillsInput>;
};

export type SkillUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SkillUpdateManyWithoutContractInput = {
  create?: Maybe<Array<SkillCreateWithoutContractInput>>;
  connect?: Maybe<Array<SkillWhereUniqueInput>>;
  set?: Maybe<Array<SkillWhereUniqueInput>>;
  disconnect?: Maybe<Array<SkillWhereUniqueInput>>;
  delete?: Maybe<Array<SkillWhereUniqueInput>>;
  update?: Maybe<Array<SkillUpdateWithWhereUniqueWithoutContractInput>>;
  updateMany?: Maybe<Array<SkillUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<SkillScalarWhereInput>>;
  upsert?: Maybe<Array<SkillUpsertWithWhereUniqueWithoutContractInput>>;
};

export type SkillUpdateManyWithWhereNestedInput = {
  where: SkillScalarWhereInput;
  data: SkillUpdateManyDataInput;
};

export type SkillUpdateOneRequiredWithoutSkillToStudentsInput = {
  create?: Maybe<SkillCreateWithoutSkillToStudentsInput>;
  connect?: Maybe<SkillWhereUniqueInput>;
  update?: Maybe<SkillUpdateWithoutSkillToStudentsDataInput>;
  upsert?: Maybe<SkillUpsertWithoutSkillToStudentsInput>;
};

export type SkillUpdateWithoutContractDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  skillToStudents?: Maybe<SkillToStudentUpdateManyWithoutSkillInput>;
};

export type SkillUpdateWithoutSkillToStudentsDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  contract?: Maybe<ContractUpdateOneRequiredWithoutSkillsInput>;
};

export type SkillUpdateWithWhereUniqueWithoutContractInput = {
  where: SkillWhereUniqueInput;
  data: SkillUpdateWithoutContractDataInput;
};

export type SkillUpsertWithoutSkillToStudentsInput = {
  update: SkillUpdateWithoutSkillToStudentsDataInput;
  create: SkillCreateWithoutSkillToStudentsInput;
};

export type SkillUpsertWithWhereUniqueWithoutContractInput = {
  where: SkillWhereUniqueInput;
  update: SkillUpdateWithoutContractDataInput;
  create: SkillCreateWithoutContractInput;
};

export type SkillWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  skillToStudents?: Maybe<SkillToStudentFilter>;
  contractId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillWhereInput>>;
  OR?: Maybe<Array<SkillWhereInput>>;
  NOT?: Maybe<Array<SkillWhereInput>>;
  contract?: Maybe<ContractWhereInput>;
};

export type SkillWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Student = {
   __typename?: 'Student';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['Int'];
  skillToStudents?: Maybe<Array<SkillToStudent>>;
};


export type StudentSkillToStudentsArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
  orderBy?: Maybe<SkillToStudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillToStudentWhereUniqueInput>;
  before?: Maybe<SkillToStudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type StudentAuthPayload = {
   __typename?: 'StudentAuthPayload';
  token: Scalars['String'];
  student: Student;
};

export type StudentCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  skillToStudents?: Maybe<SkillToStudentCreateManyWithoutStudentInput>;
};

export type StudentCreateOneWithoutSkillToStudentsInput = {
  create?: Maybe<StudentCreateWithoutSkillToStudentsInput>;
  connect?: Maybe<StudentWhereUniqueInput>;
};

export type StudentCreateWithoutSkillToStudentsInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type StudentOrderByInput = {
  firstName?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  lastName?: Maybe<OrderByArg>;
};

export type StudentUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  skillToStudents?: Maybe<SkillToStudentUpdateManyWithoutStudentInput>;
};

export type StudentUpdateOneRequiredWithoutSkillToStudentsInput = {
  create?: Maybe<StudentCreateWithoutSkillToStudentsInput>;
  connect?: Maybe<StudentWhereUniqueInput>;
  update?: Maybe<StudentUpdateWithoutSkillToStudentsDataInput>;
  upsert?: Maybe<StudentUpsertWithoutSkillToStudentsInput>;
};

export type StudentUpdateWithoutSkillToStudentsDataInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
};

export type StudentUpsertWithoutSkillToStudentsInput = {
  update: StudentUpdateWithoutSkillToStudentsDataInput;
  create: StudentCreateWithoutSkillToStudentsInput;
};

export type StudentWhereInput = {
  firstName?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  lastName?: Maybe<StringFilter>;
  skillToStudents?: Maybe<SkillToStudentFilter>;
  AND?: Maybe<Array<StudentWhereInput>>;
  OR?: Maybe<Array<StudentWhereInput>>;
  NOT?: Maybe<Array<StudentWhereInput>>;
};

export type StudentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Teacher = {
   __typename?: 'Teacher';
  email: Scalars['String'];
};

export type TeacherCreateInputCustom = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  teacher?: Maybe<Teacher>;
  student?: Maybe<Student>;
};

export type AddStudentMutationVariables = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type AddStudentMutation = (
  { __typename?: 'Mutation' }
  & { createOneStudent: (
    { __typename?: 'Student' }
    & Pick<Student, 'id'>
  ) }
);

export type CheckIfStudentExistsMutationVariables = {
  id: Scalars['Float'];
};


export type CheckIfStudentExistsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkIsStudentExists'>
);

export type CreateOneContractMutationVariables = {
  date: Scalars['DateTime'];
  skills: Array<Scalars['String']>;
};


export type CreateOneContractMutation = (
  { __typename?: 'Mutation' }
  & { createOneContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'date'>
  ) }
);

export type DeleteContractMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteContractMutation = (
  { __typename?: 'Mutation' }
  & { removeOneContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'id'>
  ) }
);

export type DeleteStudentMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteStudentMutation = (
  { __typename?: 'Mutation' }
  & { deleteStudent: (
    { __typename?: 'Student' }
    & Pick<Student, 'id'>
  ) }
);

export type EditSkillToStudentMutationVariables = {
  mark: Mark;
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
};


export type EditSkillToStudentMutation = (
  { __typename?: 'Mutation' }
  & { editOrCreateSkillToStudent: (
    { __typename?: 'SkillToStudent' }
    & Pick<SkillToStudent, 'id'>
  ) }
);

export type LoginTeacherMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginTeacherMutation = (
  { __typename?: 'Mutation' }
  & { loginTeacher: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type CreateOneSkillToContractMutationVariables = {
  name: Scalars['String'];
  contractID: Scalars['Int'];
};


export type CreateOneSkillToContractMutation = (
  { __typename?: 'Mutation' }
  & { createOneSkill: (
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'date' | 'id'>
      & { skills?: Maybe<Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents?: Maybe<Array<(
          { __typename?: 'SkillToStudent' }
          & Pick<SkillToStudent, 'id' | 'mark'>
        )>> }
      )>> }
    ) }
  ) }
);

export type DeleteSkillMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteSkillMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneSkill?: Maybe<(
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'date' | 'id'>
      & { skills?: Maybe<Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents?: Maybe<Array<(
          { __typename?: 'SkillToStudent' }
          & Pick<SkillToStudent, 'id' | 'mark'>
        )>> }
      )>> }
    ) }
  )> }
);

export type EditSkillNameMutationVariables = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type EditSkillNameMutation = (
  { __typename?: 'Mutation' }
  & { updateOneSkill?: Maybe<(
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'date' | 'id'>
      & { skills?: Maybe<Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents?: Maybe<Array<(
          { __typename?: 'SkillToStudent' }
          & Pick<SkillToStudent, 'id' | 'mark'>
        )>> }
      )>> }
    ) }
  )> }
);

export type LoginStudentMutationVariables = {
  username: Scalars['Int'];
};


export type LoginStudentMutation = (
  { __typename?: 'Mutation' }
  & { loginStudent: (
    { __typename?: 'StudentAuthPayload' }
    & Pick<StudentAuthPayload, 'token'>
  ) }
);

export type LoginStudentOldMutationVariables = {
  id: Scalars['Float'];
};


export type LoginStudentOldMutation = (
  { __typename?: 'Mutation' }
  & { loginStudentOld: (
    { __typename?: 'StudentAuthPayload' }
    & Pick<StudentAuthPayload, 'token'>
    & { student: (
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'firstName' | 'lastName'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'mark'>
        & { skill?: Maybe<(
          { __typename?: 'Skill' }
          & Pick<Skill, 'id'>
        )> }
      )>> }
    ) }
  ) }
);

export type ContractByDateQueryVariables = {
  date: Scalars['DateTime'];
};


export type ContractByDateQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'date' | 'id'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
      )>> }
    )>> }
  )> }
);

export type ContractsDatesOnlyQueryVariables = {};


export type ContractsDatesOnlyQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'date'>
  )> }
);

export type FetchContractQueryVariables = {
  id: Scalars['Int'];
};


export type FetchContractQuery = (
  { __typename?: 'Query' }
  & { contract?: Maybe<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'date'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
        & { student?: Maybe<(
          { __typename?: 'Student' }
          & Pick<Student, 'id' | 'firstName' | 'lastName'>
        )> }
      )>> }
    )>> }
  )> }
);

export type FetchContractsQueryVariables = {};


export type FetchContractsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'date'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    )>> }
  )> }
);

export type FetchContractsAwaitingFinishStudentQueryVariables = {
  studentId: Scalars['Int'];
};


export type FetchContractsAwaitingFinishStudentQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'date'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
      )>> }
    )>> }
  )> }
);

export type FetchStudentQueryVariables = {
  id: Scalars['Int'];
};


export type FetchStudentQuery = (
  { __typename?: 'Query' }
  & { student?: Maybe<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName'>
    & { skillToStudents?: Maybe<Array<(
      { __typename?: 'SkillToStudent' }
      & Pick<SkillToStudent, 'mark'>
      & { skill?: Maybe<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      )> }
    )>> }
  )> }
);

export type FetchStudentsQueryVariables = {};


export type FetchStudentsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName'>
  )> }
);

export type FetchStudentsWithAwaitingToFinishContractsQueryVariables = {};


export type FetchStudentsWithAwaitingToFinishContractsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName'>
    & { skillToStudents?: Maybe<Array<(
      { __typename?: 'SkillToStudent' }
      & Pick<SkillToStudent, 'id' | 'mark'>
    )>> }
  )> }
);

export type GetSheetFileQueryVariables = {};


export type GetSheetFileQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'contractsToExcel'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & { student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'firstName' | 'lastName'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
        & { skill?: Maybe<(
          { __typename?: 'Skill' }
          & Pick<Skill, 'id'>
        )> }
      )>> }
    )>, teacher?: Maybe<(
      { __typename?: 'Teacher' }
      & Pick<Teacher, 'email'>
    )> }
  ) }
);
