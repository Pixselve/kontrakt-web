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

export type Contract = {
   __typename?: 'Contract';
  end: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  skills?: Maybe<Array<Skill>>;
  groups?: Maybe<Array<Group>>;
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


export type ContractGroupsArgs = {
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<GroupOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<GroupWhereUniqueInput>;
  before?: Maybe<GroupWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ContractCreateInput = {
  end: Scalars['DateTime'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  skills?: Maybe<SkillCreateManyWithoutContractInput>;
  groups?: Maybe<GroupCreateManyWithoutContractsInput>;
};

export type ContractCreateManyWithoutGroupsInput = {
  create?: Maybe<Array<ContractCreateWithoutGroupsInput>>;
  connect?: Maybe<Array<ContractWhereUniqueInput>>;
};

export type ContractCreateOneWithoutSkillsInput = {
  create?: Maybe<ContractCreateWithoutSkillsInput>;
  connect?: Maybe<ContractWhereUniqueInput>;
};

export type ContractCreateWithoutGroupsInput = {
  end: Scalars['DateTime'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  skills?: Maybe<SkillCreateManyWithoutContractInput>;
};

export type ContractCreateWithoutSkillsInput = {
  end: Scalars['DateTime'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  groups?: Maybe<GroupCreateManyWithoutContractsInput>;
};

export type ContractFilter = {
  every?: Maybe<ContractWhereInput>;
  some?: Maybe<ContractWhereInput>;
  none?: Maybe<ContractWhereInput>;
};

export type ContractOrderByInput = {
  end?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  start?: Maybe<OrderByArg>;
};

export type ContractScalarWhereInput = {
  end?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  start?: Maybe<DateTimeFilter>;
  skills?: Maybe<SkillFilter>;
  groups?: Maybe<GroupFilter>;
  AND?: Maybe<Array<ContractScalarWhereInput>>;
  OR?: Maybe<Array<ContractScalarWhereInput>>;
  NOT?: Maybe<Array<ContractScalarWhereInput>>;
};

export type ContractUpdateManyDataInput = {
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
};

export type ContractUpdateManyWithoutGroupsInput = {
  create?: Maybe<Array<ContractCreateWithoutGroupsInput>>;
  connect?: Maybe<Array<ContractWhereUniqueInput>>;
  set?: Maybe<Array<ContractWhereUniqueInput>>;
  disconnect?: Maybe<Array<ContractWhereUniqueInput>>;
  delete?: Maybe<Array<ContractWhereUniqueInput>>;
  update?: Maybe<Array<ContractUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: Maybe<Array<ContractUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ContractScalarWhereInput>>;
  upsert?: Maybe<Array<ContractUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type ContractUpdateManyWithWhereNestedInput = {
  where: ContractScalarWhereInput;
  data: ContractUpdateManyDataInput;
};

export type ContractUpdateOneRequiredWithoutSkillsInput = {
  create?: Maybe<ContractCreateWithoutSkillsInput>;
  connect?: Maybe<ContractWhereUniqueInput>;
  update?: Maybe<ContractUpdateWithoutSkillsDataInput>;
  upsert?: Maybe<ContractUpsertWithoutSkillsInput>;
};

export type ContractUpdateWithoutGroupsDataInput = {
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  skills?: Maybe<SkillUpdateManyWithoutContractInput>;
};

export type ContractUpdateWithoutSkillsDataInput = {
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  groups?: Maybe<GroupUpdateManyWithoutContractsInput>;
};

export type ContractUpdateWithWhereUniqueWithoutGroupsInput = {
  where: ContractWhereUniqueInput;
  data: ContractUpdateWithoutGroupsDataInput;
};

export type ContractUpsertWithoutSkillsInput = {
  update: ContractUpdateWithoutSkillsDataInput;
  create: ContractCreateWithoutSkillsInput;
};

export type ContractUpsertWithWhereUniqueWithoutGroupsInput = {
  where: ContractWhereUniqueInput;
  update: ContractUpdateWithoutGroupsDataInput;
  create: ContractCreateWithoutGroupsInput;
};

export type ContractWhereInput = {
  end?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  start?: Maybe<DateTimeFilter>;
  skills?: Maybe<SkillFilter>;
  groups?: Maybe<GroupFilter>;
  AND?: Maybe<Array<ContractWhereInput>>;
  OR?: Maybe<Array<ContractWhereInput>>;
  NOT?: Maybe<Array<ContractWhereInput>>;
};

export type ContractWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
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

export type Group = {
   __typename?: 'Group';
  id: Scalars['Int'];
  name: Scalars['String'];
  contracts?: Maybe<Array<Contract>>;
  students?: Maybe<Array<Student>>;
};


export type GroupContractsArgs = {
  where?: Maybe<ContractWhereInput>;
  orderBy?: Maybe<ContractOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ContractWhereUniqueInput>;
  before?: Maybe<ContractWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GroupStudentsArgs = {
  where?: Maybe<StudentWhereInput>;
  orderBy?: Maybe<StudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<StudentWhereUniqueInput>;
  before?: Maybe<StudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type GroupCreateManyWithoutContractsInput = {
  create?: Maybe<Array<GroupCreateWithoutContractsInput>>;
  connect?: Maybe<Array<GroupWhereUniqueInput>>;
};

export type GroupCreateManyWithoutStudentsInput = {
  create?: Maybe<Array<GroupCreateWithoutStudentsInput>>;
  connect?: Maybe<Array<GroupWhereUniqueInput>>;
};

export type GroupCreateWithoutContractsInput = {
  name: Scalars['String'];
  students?: Maybe<StudentCreateManyWithoutGroupsInput>;
};

export type GroupCreateWithoutStudentsInput = {
  name: Scalars['String'];
  contracts?: Maybe<ContractCreateManyWithoutGroupsInput>;
};

export type GroupFilter = {
  every?: Maybe<GroupWhereInput>;
  some?: Maybe<GroupWhereInput>;
  none?: Maybe<GroupWhereInput>;
};

export type GroupOrderByInput = {
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
};

export type GroupScalarWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  contracts?: Maybe<ContractFilter>;
  students?: Maybe<StudentFilter>;
  AND?: Maybe<Array<GroupScalarWhereInput>>;
  OR?: Maybe<Array<GroupScalarWhereInput>>;
  NOT?: Maybe<Array<GroupScalarWhereInput>>;
};

export type GroupUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type GroupUpdateManyWithoutContractsInput = {
  create?: Maybe<Array<GroupCreateWithoutContractsInput>>;
  connect?: Maybe<Array<GroupWhereUniqueInput>>;
  set?: Maybe<Array<GroupWhereUniqueInput>>;
  disconnect?: Maybe<Array<GroupWhereUniqueInput>>;
  delete?: Maybe<Array<GroupWhereUniqueInput>>;
  update?: Maybe<Array<GroupUpdateWithWhereUniqueWithoutContractsInput>>;
  updateMany?: Maybe<Array<GroupUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<GroupScalarWhereInput>>;
  upsert?: Maybe<Array<GroupUpsertWithWhereUniqueWithoutContractsInput>>;
};

export type GroupUpdateManyWithoutStudentsInput = {
  create?: Maybe<Array<GroupCreateWithoutStudentsInput>>;
  connect?: Maybe<Array<GroupWhereUniqueInput>>;
  set?: Maybe<Array<GroupWhereUniqueInput>>;
  disconnect?: Maybe<Array<GroupWhereUniqueInput>>;
  delete?: Maybe<Array<GroupWhereUniqueInput>>;
  update?: Maybe<Array<GroupUpdateWithWhereUniqueWithoutStudentsInput>>;
  updateMany?: Maybe<Array<GroupUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<GroupScalarWhereInput>>;
  upsert?: Maybe<Array<GroupUpsertWithWhereUniqueWithoutStudentsInput>>;
};

export type GroupUpdateManyWithWhereNestedInput = {
  where: GroupScalarWhereInput;
  data: GroupUpdateManyDataInput;
};

export type GroupUpdateWithoutContractsDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  students?: Maybe<StudentUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithoutStudentsDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  contracts?: Maybe<ContractUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithWhereUniqueWithoutContractsInput = {
  where: GroupWhereUniqueInput;
  data: GroupUpdateWithoutContractsDataInput;
};

export type GroupUpdateWithWhereUniqueWithoutStudentsInput = {
  where: GroupWhereUniqueInput;
  data: GroupUpdateWithoutStudentsDataInput;
};

export type GroupUpsertWithWhereUniqueWithoutContractsInput = {
  where: GroupWhereUniqueInput;
  update: GroupUpdateWithoutContractsDataInput;
  create: GroupCreateWithoutContractsInput;
};

export type GroupUpsertWithWhereUniqueWithoutStudentsInput = {
  where: GroupWhereUniqueInput;
  update: GroupUpdateWithoutStudentsDataInput;
  create: GroupCreateWithoutStudentsInput;
};

export type GroupWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  contracts?: Maybe<ContractFilter>;
  students?: Maybe<StudentFilter>;
  AND?: Maybe<Array<GroupWhereInput>>;
  OR?: Maybe<Array<GroupWhereInput>>;
  NOT?: Maybe<Array<GroupWhereInput>>;
};

export type GroupWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
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

export type Mark = {
   __typename?: 'Mark';
  rgb: Scalars['String'];
  text: Scalars['String'];
  value: Scalars['String'];
  skillsToStudents?: Maybe<Array<SkillToStudent>>;
};


export type MarkSkillsToStudentsArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
  orderBy?: Maybe<SkillToStudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillToStudentWhereUniqueInput>;
  before?: Maybe<SkillToStudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MarkCreateOneWithoutSkillsToStudentsInput = {
  create?: Maybe<MarkCreateWithoutSkillsToStudentsInput>;
  connect?: Maybe<MarkWhereUniqueInput>;
};

export type MarkCreateWithoutSkillsToStudentsInput = {
  rgb: Scalars['String'];
  text: Scalars['String'];
  value: Scalars['String'];
};

export type MarkUpdateOneRequiredWithoutSkillsToStudentsInput = {
  create?: Maybe<MarkCreateWithoutSkillsToStudentsInput>;
  connect?: Maybe<MarkWhereUniqueInput>;
  update?: Maybe<MarkUpdateWithoutSkillsToStudentsDataInput>;
  upsert?: Maybe<MarkUpsertWithoutSkillsToStudentsInput>;
};

export type MarkUpdateWithoutSkillsToStudentsDataInput = {
  rgb?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MarkUpsertWithoutSkillsToStudentsInput = {
  update: MarkUpdateWithoutSkillsToStudentsDataInput;
  create: MarkCreateWithoutSkillsToStudentsInput;
};

export type MarkWhereInput = {
  rgb?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  value?: Maybe<StringFilter>;
  skillsToStudents?: Maybe<SkillToStudentFilter>;
  AND?: Maybe<Array<MarkWhereInput>>;
  OR?: Maybe<Array<MarkWhereInput>>;
  NOT?: Maybe<Array<MarkWhereInput>>;
};

export type MarkWhereUniqueInput = {
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createTeacher: Teacher;
  deleteTeacher?: Maybe<Teacher>;
  loginStudent: StudentAuthPayload;
  loginTeacher: AuthPayload;
  createStudent: Student;
  createContract: Contract;
  deleteContract?: Maybe<Contract>;
  deleteStudent?: Maybe<Student>;
  upsertSkillToStudent: SkillToStudent;
  deleteSkill?: Maybe<Skill>;
  updateSkill?: Maybe<Skill>;
  createSkill: Skill;
};


export type MutationCreateTeacherArgs = {
  data: TeacherCreateInput;
};


export type MutationDeleteTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type MutationLoginStudentArgs = {
  username: Scalars['Int'];
};


export type MutationLoginTeacherArgs = {
  data: TeacherCreateInput;
};


export type MutationCreateStudentArgs = {
  data: StudentCreateInput;
};


export type MutationCreateContractArgs = {
  data: ContractCreateInput;
};


export type MutationDeleteContractArgs = {
  where: ContractWhereUniqueInput;
};


export type MutationDeleteStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type MutationUpsertSkillToStudentArgs = {
  where: SkillToStudentWhereUniqueInput;
  create: SkillToStudentCreateInput;
  update: SkillToStudentUpdateInput;
};


export type MutationDeleteSkillArgs = {
  where: SkillWhereUniqueInput;
};


export type MutationUpdateSkillArgs = {
  data: SkillUpdateInput;
  where: SkillWhereUniqueInput;
};


export type MutationCreateSkillArgs = {
  data: SkillCreateInput;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
   __typename?: 'Query';
  teacher?: Maybe<Teacher>;
  teachers: Array<Teacher>;
  students: Array<Student>;
  student?: Maybe<Student>;
  contracts: Array<Contract>;
  contract?: Maybe<Contract>;
  me: User;
};


export type QueryTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type QueryTeachersArgs = {
  where?: Maybe<TeacherWhereInput>;
  orderBy?: Maybe<TeacherOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TeacherWhereUniqueInput>;
  before?: Maybe<TeacherWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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


export type QueryStudentArgs = {
  where: StudentWhereUniqueInput;
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


export type QueryContractArgs = {
  where: ContractWhereUniqueInput;
};

export type Skill = {
   __typename?: 'Skill';
  contractId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  contract: Contract;
  skillToStudents?: Maybe<Array<SkillToStudent>>;
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
  contract: ContractCreateOneWithoutSkillsInput;
  skillToStudents?: Maybe<SkillToStudentCreateManyWithoutSkillInput>;
};

export type SkillCreateManyWithoutContractInput = {
  create?: Maybe<Array<SkillCreateWithoutContractInput>>;
  connect?: Maybe<Array<SkillWhereUniqueInput>>;
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
  contractId?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
};

export type SkillScalarWhereInput = {
  contractId?: Maybe<IntFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  skillToStudents?: Maybe<SkillToStudentFilter>;
  AND?: Maybe<Array<SkillScalarWhereInput>>;
  OR?: Maybe<Array<SkillScalarWhereInput>>;
  NOT?: Maybe<Array<SkillScalarWhereInput>>;
};

export type SkillToStudent = {
   __typename?: 'SkillToStudent';
  markValue: Scalars['String'];
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
  mark: Mark;
  skill: Skill;
  student: Student;
};

export type SkillToStudentCreateInput = {
  mark: MarkCreateOneWithoutSkillsToStudentsInput;
  skill: SkillCreateOneWithoutSkillToStudentsInput;
  student: StudentCreateOneWithoutSkillsToStudentInput;
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
  mark: MarkCreateOneWithoutSkillsToStudentsInput;
  student: StudentCreateOneWithoutSkillsToStudentInput;
};

export type SkillToStudentCreateWithoutStudentInput = {
  mark: MarkCreateOneWithoutSkillsToStudentsInput;
  skill: SkillCreateOneWithoutSkillToStudentsInput;
};

export type SkillToStudentFilter = {
  every?: Maybe<SkillToStudentWhereInput>;
  some?: Maybe<SkillToStudentWhereInput>;
  none?: Maybe<SkillToStudentWhereInput>;
};

export type SkillToStudentOrderByInput = {
  markValue?: Maybe<OrderByArg>;
  skillId?: Maybe<OrderByArg>;
  studentId?: Maybe<OrderByArg>;
};

export type SkillToStudentScalarWhereInput = {
  markValue?: Maybe<StringFilter>;
  skillId?: Maybe<IntFilter>;
  studentId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  OR?: Maybe<Array<SkillToStudentScalarWhereInput>>;
  NOT?: Maybe<Array<SkillToStudentScalarWhereInput>>;
};

export type SkillToStudentUpdateInput = {
  mark?: Maybe<MarkUpdateOneRequiredWithoutSkillsToStudentsInput>;
  skill?: Maybe<SkillUpdateOneRequiredWithoutSkillToStudentsInput>;
  student?: Maybe<StudentUpdateOneRequiredWithoutSkillsToStudentInput>;
};

export type SkillToStudentUpdateManyDataInput = {
  none: Scalars['String'];
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
  mark?: Maybe<MarkUpdateOneRequiredWithoutSkillsToStudentsInput>;
  student?: Maybe<StudentUpdateOneRequiredWithoutSkillsToStudentInput>;
};

export type SkillToStudentUpdateWithoutStudentDataInput = {
  mark?: Maybe<MarkUpdateOneRequiredWithoutSkillsToStudentsInput>;
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
  markValue?: Maybe<StringFilter>;
  skillId?: Maybe<IntFilter>;
  studentId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SkillToStudentWhereInput>>;
  OR?: Maybe<Array<SkillToStudentWhereInput>>;
  NOT?: Maybe<Array<SkillToStudentWhereInput>>;
  mark?: Maybe<MarkWhereInput>;
  skill?: Maybe<SkillWhereInput>;
  student?: Maybe<StudentWhereInput>;
};

export type SkillToStudentWhereUniqueInput = {
  studentId_skillId?: Maybe<StudentIdSkillIdCompoundUniqueInput>;
};

export type SkillUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  contract?: Maybe<ContractUpdateOneRequiredWithoutSkillsInput>;
  skillToStudents?: Maybe<SkillToStudentUpdateManyWithoutSkillInput>;
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
  contractId?: Maybe<IntFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  skillToStudents?: Maybe<SkillToStudentFilter>;
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
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  username: Scalars['Int'];
  skillsToStudent?: Maybe<Array<SkillToStudent>>;
  groups?: Maybe<Array<Group>>;
};


export type StudentSkillsToStudentArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
  orderBy?: Maybe<SkillToStudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillToStudentWhereUniqueInput>;
  before?: Maybe<SkillToStudentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type StudentGroupsArgs = {
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<GroupOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<GroupWhereUniqueInput>;
  before?: Maybe<GroupWhereUniqueInput>;
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
  groups?: Maybe<GroupCreateManyWithoutStudentsInput>;
};

export type StudentCreateManyWithoutGroupsInput = {
  create?: Maybe<Array<StudentCreateWithoutGroupsInput>>;
  connect?: Maybe<Array<StudentWhereUniqueInput>>;
};

export type StudentCreateOneWithoutSkillsToStudentInput = {
  create?: Maybe<StudentCreateWithoutSkillsToStudentInput>;
  connect?: Maybe<StudentWhereUniqueInput>;
};

export type StudentCreateWithoutGroupsInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['Int'];
  skillsToStudent?: Maybe<SkillToStudentCreateManyWithoutStudentInput>;
};

export type StudentCreateWithoutSkillsToStudentInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['Int'];
  groups?: Maybe<GroupCreateManyWithoutStudentsInput>;
};

export type StudentFilter = {
  every?: Maybe<StudentWhereInput>;
  some?: Maybe<StudentWhereInput>;
  none?: Maybe<StudentWhereInput>;
};

export type StudentIdSkillIdCompoundUniqueInput = {
  studentId: Scalars['Int'];
  skillId: Scalars['Int'];
};

export type StudentOrderByInput = {
  firstName?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  lastName?: Maybe<OrderByArg>;
  username?: Maybe<OrderByArg>;
};

export type StudentScalarWhereInput = {
  firstName?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  lastName?: Maybe<StringFilter>;
  username?: Maybe<IntFilter>;
  skillsToStudent?: Maybe<SkillToStudentFilter>;
  groups?: Maybe<GroupFilter>;
  AND?: Maybe<Array<StudentScalarWhereInput>>;
  OR?: Maybe<Array<StudentScalarWhereInput>>;
  NOT?: Maybe<Array<StudentScalarWhereInput>>;
};

export type StudentUpdateManyDataInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['Int']>;
};

export type StudentUpdateManyWithoutGroupsInput = {
  create?: Maybe<Array<StudentCreateWithoutGroupsInput>>;
  connect?: Maybe<Array<StudentWhereUniqueInput>>;
  set?: Maybe<Array<StudentWhereUniqueInput>>;
  disconnect?: Maybe<Array<StudentWhereUniqueInput>>;
  delete?: Maybe<Array<StudentWhereUniqueInput>>;
  update?: Maybe<Array<StudentUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: Maybe<Array<StudentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<StudentScalarWhereInput>>;
  upsert?: Maybe<Array<StudentUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type StudentUpdateManyWithWhereNestedInput = {
  where: StudentScalarWhereInput;
  data: StudentUpdateManyDataInput;
};

export type StudentUpdateOneRequiredWithoutSkillsToStudentInput = {
  create?: Maybe<StudentCreateWithoutSkillsToStudentInput>;
  connect?: Maybe<StudentWhereUniqueInput>;
  update?: Maybe<StudentUpdateWithoutSkillsToStudentDataInput>;
  upsert?: Maybe<StudentUpsertWithoutSkillsToStudentInput>;
};

export type StudentUpdateWithoutGroupsDataInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['Int']>;
  skillsToStudent?: Maybe<SkillToStudentUpdateManyWithoutStudentInput>;
};

export type StudentUpdateWithoutSkillsToStudentDataInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['Int']>;
  groups?: Maybe<GroupUpdateManyWithoutStudentsInput>;
};

export type StudentUpdateWithWhereUniqueWithoutGroupsInput = {
  where: StudentWhereUniqueInput;
  data: StudentUpdateWithoutGroupsDataInput;
};

export type StudentUpsertWithoutSkillsToStudentInput = {
  update: StudentUpdateWithoutSkillsToStudentDataInput;
  create: StudentCreateWithoutSkillsToStudentInput;
};

export type StudentUpsertWithWhereUniqueWithoutGroupsInput = {
  where: StudentWhereUniqueInput;
  update: StudentUpdateWithoutGroupsDataInput;
  create: StudentCreateWithoutGroupsInput;
};

export type StudentWhereInput = {
  firstName?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  lastName?: Maybe<StringFilter>;
  username?: Maybe<IntFilter>;
  skillsToStudent?: Maybe<SkillToStudentFilter>;
  groups?: Maybe<GroupFilter>;
  AND?: Maybe<Array<StudentWhereInput>>;
  OR?: Maybe<Array<StudentWhereInput>>;
  NOT?: Maybe<Array<StudentWhereInput>>;
};

export type StudentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['Int']>;
};

export type Teacher = {
   __typename?: 'Teacher';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TeacherCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TeacherOrderByInput = {
  email?: Maybe<OrderByArg>;
  password?: Maybe<OrderByArg>;
};

export type TeacherWhereInput = {
  email?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  AND?: Maybe<Array<TeacherWhereInput>>;
  OR?: Maybe<Array<TeacherWhereInput>>;
  NOT?: Maybe<Array<TeacherWhereInput>>;
};

export type TeacherWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
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
  & { createStudent: (
    { __typename?: 'Student' }
    & Pick<Student, 'id'>
  ) }
);

export type CreateOneContractMutationVariables = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  skills?: Maybe<SkillCreateManyWithoutContractInput>;
  name: Scalars['String'];
};


export type CreateOneContractMutation = (
  { __typename?: 'Mutation' }
  & { createContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'start'>
  ) }
);

export type DeleteContractMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteContractMutation = (
  { __typename?: 'Mutation' }
  & { deleteContract?: Maybe<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id'>
  )> }
);

export type DeleteStudentMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteStudentMutation = (
  { __typename?: 'Mutation' }
  & { deleteStudent?: Maybe<(
    { __typename?: 'Student' }
    & Pick<Student, 'id'>
  )> }
);

export type EditSkillToStudentMutationVariables = {
  markValue: Scalars['String'];
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
};


export type EditSkillToStudentMutation = (
  { __typename?: 'Mutation' }
  & { upsertSkillToStudent: (
    { __typename?: 'SkillToStudent' }
    & { mark: (
      { __typename?: 'Mark' }
      & Pick<Mark, 'text' | 'value'>
    ) }
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
  & { createSkill: (
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'start' | 'id'>
      & { skills?: Maybe<Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents?: Maybe<Array<(
          { __typename?: 'SkillToStudent' }
          & { mark: (
            { __typename?: 'Mark' }
            & Pick<Mark, 'text' | 'value' | 'rgb'>
          ) }
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
  & { deleteSkill?: Maybe<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id'>
  )> }
);

export type EditSkillNameMutationVariables = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type EditSkillNameMutation = (
  { __typename?: 'Mutation' }
  & { updateSkill?: Maybe<(
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'start' | 'id'>
      & { skills?: Maybe<Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents?: Maybe<Array<(
          { __typename?: 'SkillToStudent' }
          & { mark: (
            { __typename?: 'Mark' }
            & Pick<Mark, 'text' | 'value' | 'rgb'>
          ) }
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

export type ContractByDateQueryVariables = {
  date: Scalars['DateTime'];
};


export type ContractByDateQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'start' | 'end' | 'id' | 'name'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'skillId' | 'studentId'>
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'rgb' | 'text' | 'value'>
        ) }
      )>> }
    )>> }
  )> }
);

export type ContractsDatesOnlyQueryVariables = {};


export type ContractsDatesOnlyQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'start' | 'end'>
  )> }
);

export type FetchContractQueryVariables = {
  id: Scalars['Int'];
};


export type FetchContractQuery = (
  { __typename?: 'Query' }
  & { contract?: Maybe<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'text' | 'value' | 'rgb'>
        ), student: (
          { __typename?: 'Student' }
          & Pick<Student, 'id' | 'firstName' | 'lastName'>
        ) }
      )>> }
    )>> }
  )> }
);

export type FetchContractsQueryVariables = {};


export type FetchContractsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name'>
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
    & Pick<Contract, 'id' | 'start' | 'end' | 'name'>
    & { skills?: Maybe<Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'text' | 'value' | 'rgb'>
        ) }
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
    & { skillsToStudent?: Maybe<Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
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
    & { skillsToStudent?: Maybe<Array<(
      { __typename?: 'SkillToStudent' }
      & Pick<SkillToStudent, 'skillId'>
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'text' | 'value' | 'rgb'>
      ) }
    )>> }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & { student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'firstName' | 'lastName'>
      & { skillsToStudent?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'value' | 'text' | 'rgb'>
        ), skill: (
          { __typename?: 'Skill' }
          & Pick<Skill, 'id'>
        ) }
      )>> }
    )>, teacher?: Maybe<(
      { __typename?: 'Teacher' }
      & Pick<Teacher, 'email'>
    )> }
  ) }
);
