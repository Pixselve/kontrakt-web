export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  token: Scalars['String'];
  teacher: Teacher;
};

export type BatchPayload = {
   __typename?: 'BatchPayload';
  count: Scalars['Int'];
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

export type ContractCreateInput = {
  date: Scalars['DateTime'];
  skills?: Maybe<SkillCreateManyWithoutContractInput>;
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

export type ContractUpdateManyMutationInput = {
  date?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
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
  createOneContract: Contract;
  deleteOneContract?: Maybe<Contract>;
  updateOneContract?: Maybe<Contract>;
  deleteManyContract: BatchPayload;
  updateManyContract: BatchPayload;
  upsertOneContract: Contract;
  createOneSkill: Skill;
  deleteOneSkill?: Maybe<Skill>;
  updateOneSkill?: Maybe<Skill>;
  deleteManySkill: BatchPayload;
  updateManySkill: BatchPayload;
  upsertOneSkill: Skill;
  createOneSkillToStudent: SkillToStudent;
  deleteOneSkillToStudent?: Maybe<SkillToStudent>;
  updateOneSkillToStudent?: Maybe<SkillToStudent>;
  deleteManySkillToStudent: BatchPayload;
  updateManySkillToStudent: BatchPayload;
  upsertOneSkillToStudent: SkillToStudent;
  createOneStudent: Student;
  deleteOneStudent?: Maybe<Student>;
  updateOneStudent?: Maybe<Student>;
  deleteManyStudent: BatchPayload;
  updateManyStudent: BatchPayload;
  upsertOneStudent: Student;
  createOneTeacher: Teacher;
  deleteOneTeacher?: Maybe<Teacher>;
  updateOneTeacher?: Maybe<Teacher>;
  deleteManyTeacher: BatchPayload;
  updateManyTeacher: BatchPayload;
  upsertOneTeacher: Teacher;
  createTeacher: AuthPayload;
  loginTeacher: AuthPayload;
  checkIsStudentExists: Scalars['Boolean'];
  removeOneContract: Contract;
  deleteStudent: Student;
  editOrCreateSkillToStudent: SkillToStudent;
};


export type MutationCreateOneContractArgs = {
  data: CreateOneContractInput;
};


export type MutationDeleteOneContractArgs = {
  where: ContractWhereUniqueInput;
};


export type MutationUpdateOneContractArgs = {
  data: ContractUpdateInput;
  where: ContractWhereUniqueInput;
};


export type MutationDeleteManyContractArgs = {
  where?: Maybe<ContractWhereInput>;
};


export type MutationUpdateManyContractArgs = {
  data: ContractUpdateManyMutationInput;
  where?: Maybe<ContractWhereInput>;
};


export type MutationUpsertOneContractArgs = {
  where: ContractWhereUniqueInput;
  create: ContractCreateInput;
  update: ContractUpdateInput;
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


export type MutationDeleteManySkillArgs = {
  where?: Maybe<SkillWhereInput>;
};


export type MutationUpdateManySkillArgs = {
  data: SkillUpdateManyMutationInput;
  where?: Maybe<SkillWhereInput>;
};


export type MutationUpsertOneSkillArgs = {
  where: SkillWhereUniqueInput;
  create: SkillCreateInput;
  update: SkillUpdateInput;
};


export type MutationCreateOneSkillToStudentArgs = {
  data: SkillToStudentCreateInput;
};


export type MutationDeleteOneSkillToStudentArgs = {
  where: SkillToStudentWhereUniqueInput;
};


export type MutationUpdateOneSkillToStudentArgs = {
  data: SkillToStudentUpdateInput;
  where: SkillToStudentWhereUniqueInput;
};


export type MutationDeleteManySkillToStudentArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
};


export type MutationUpdateManySkillToStudentArgs = {
  data: SkillToStudentUpdateManyMutationInput;
  where?: Maybe<SkillToStudentWhereInput>;
};


export type MutationUpsertOneSkillToStudentArgs = {
  where: SkillToStudentWhereUniqueInput;
  create: SkillToStudentCreateInput;
  update: SkillToStudentUpdateInput;
};


export type MutationCreateOneStudentArgs = {
  data: StudentCreateInput;
};


export type MutationDeleteOneStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type MutationUpdateOneStudentArgs = {
  data: StudentUpdateInput;
  where: StudentWhereUniqueInput;
};


export type MutationDeleteManyStudentArgs = {
  where?: Maybe<StudentWhereInput>;
};


export type MutationUpdateManyStudentArgs = {
  data: StudentUpdateManyMutationInput;
  where?: Maybe<StudentWhereInput>;
};


export type MutationUpsertOneStudentArgs = {
  where: StudentWhereUniqueInput;
  create: StudentCreateInput;
  update: StudentUpdateInput;
};


export type MutationCreateOneTeacherArgs = {
  data: TeacherCreateInput;
};


export type MutationDeleteOneTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type MutationUpdateOneTeacherArgs = {
  data: TeacherUpdateInput;
  where: TeacherWhereUniqueInput;
};


export type MutationDeleteManyTeacherArgs = {
  where?: Maybe<TeacherWhereInput>;
};


export type MutationUpdateManyTeacherArgs = {
  data: TeacherUpdateManyMutationInput;
  where?: Maybe<TeacherWhereInput>;
};


export type MutationUpsertOneTeacherArgs = {
  where: TeacherWhereUniqueInput;
  create: TeacherCreateInput;
  update: TeacherUpdateInput;
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


export type MutationRemoveOneContractArgs = {
  data: RemoveOneContractInput;
};


export type MutationDeleteStudentArgs = {
  data: DeleteStudentInput;
};


export type MutationEditOrCreateSkillToStudentArgs = {
  data: EditOrCreateSkillToStudentInput;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
   __typename?: 'Query';
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  skill?: Maybe<Skill>;
  skills: Array<Skill>;
  skillToStudent?: Maybe<SkillToStudent>;
  skillToStudents: Array<SkillToStudent>;
  student?: Maybe<Student>;
  students: Array<Student>;
  teacher?: Maybe<Teacher>;
  teachers: Array<Teacher>;
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


export type QuerySkillToStudentArgs = {
  where: SkillToStudentWhereUniqueInput;
};


export type QuerySkillToStudentsArgs = {
  where?: Maybe<SkillToStudentWhereInput>;
  orderBy?: Maybe<SkillToStudentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SkillToStudentWhereUniqueInput>;
  before?: Maybe<SkillToStudentWhereUniqueInput>;
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
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  contract?: Maybe<OrderByArg>;
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

export type SkillToStudent = {
   __typename?: 'SkillToStudent';
  id: Scalars['Int'];
  mark: Mark;
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
  skill: Skill;
  student: Student;
};

export type SkillToStudentCreateInput = {
  mark?: Maybe<Mark>;
  skill: SkillCreateOneWithoutSkillToStudentsInput;
  student: StudentCreateOneWithoutSkillToStudentsInput;
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
  skill?: Maybe<OrderByArg>;
  student?: Maybe<OrderByArg>;
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

export type SkillToStudentUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
  skill?: Maybe<SkillUpdateOneRequiredWithoutSkillToStudentsInput>;
  student?: Maybe<StudentUpdateOneRequiredWithoutSkillToStudentsInput>;
};

export type SkillToStudentUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Mark>;
};

export type SkillToStudentUpdateManyMutationInput = {
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

export type SkillUpdateManyMutationInput = {
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
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
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

export type StudentUpdateManyMutationInput = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
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
  password: Scalars['String'];
};

export type TeacherCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TeacherCreateInputCustom = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TeacherOrderByInput = {
  email?: Maybe<OrderByArg>;
  password?: Maybe<OrderByArg>;
};

export type TeacherUpdateInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type TeacherUpdateManyMutationInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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
        & { student: (
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
      & { skill: (
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
