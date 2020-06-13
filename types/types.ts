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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthPayload = {
  token: Scalars['String'];
};

export type AuthPayloadStudent = AuthPayload & {
   __typename?: 'AuthPayloadStudent';
  token: Scalars['String'];
  student: Student;
};

export type AuthPayloadTeacher = AuthPayload & {
   __typename?: 'AuthPayloadTeacher';
  token: Scalars['String'];
  teacher: Teacher;
};

export type Contract = {
   __typename?: 'Contract';
  id: Scalars['Int'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  rgb: Scalars['String'];
  archived: Scalars['Boolean'];
  skills: Array<Skill>;
  groups: Array<Group>;
};


export type ContractSkillsArgs = {
  markValues?: Maybe<Array<Scalars['String']>>;
};

export type CreateOneContractInput = {
  name: Scalars['String'];
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  skillNames: Array<Scalars['String']>;
  rgb: Scalars['String'];
};

export type CreateOneGroupInput = {
  name: Scalars['String'];
};

export type CreateOneSkillInput = {
  name: Scalars['String'];
  contractId: Scalars['Int'];
};

export type CreateOneStudentInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  groupIds?: Maybe<Array<Scalars['Int']>>;
};

export type CreateOneTeacherInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type Group = {
   __typename?: 'Group';
  id: Scalars['Int'];
  name: Scalars['String'];
  contracts: Array<Contract>;
  students: Array<Student>;
};

export type LoginStudentInput = {
  username: Scalars['Int'];
};

export type Mark = {
   __typename?: 'Mark';
  rgb: Scalars['String'];
  text: Scalars['String'];
  value: Scalars['String'];
  skillsToStudents: Array<SkillToStudent>;
  icon: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createOneTeacher: Teacher;
  deleteOneTeacher: Teacher;
  loginTeacher: AuthPayloadTeacher;
  createOneStudent: Student;
  updateOneStudent: Student;
  updateOneContract: Contract;
  createOneGroup: Group;
  createOneSkill: Skill;
  deleteOneSkill: Skill;
  updateOneSkill: Skill;
  loginStudent: AuthPayloadStudent;
  createOneContract: Contract;
  deleteOneContract: Contract;
  deleteOneStudent: Student;
  upsertOneSkillToStudent: SkillToStudent;
  createManyStudentCSV: Array<Student>;
};


export type MutationCreateOneTeacherArgs = {
  teacher: CreateOneTeacherInput;
};


export type MutationDeleteOneTeacherArgs = {
  email: Scalars['String'];
};


export type MutationLoginTeacherArgs = {
  teacher: CreateOneTeacherInput;
};


export type MutationCreateOneStudentArgs = {
  student: CreateOneStudentInput;
};


export type MutationUpdateOneStudentArgs = {
  student: UpdateOneStudentInput;
  id: Scalars['Int'];
};


export type MutationUpdateOneContractArgs = {
  contract: UpdateOneContractInput;
  id: Scalars['Int'];
};


export type MutationCreateOneGroupArgs = {
  group: CreateOneGroupInput;
};


export type MutationCreateOneSkillArgs = {
  skill: CreateOneSkillInput;
};


export type MutationDeleteOneSkillArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateOneSkillArgs = {
  skill: UpdateOneSkillInput;
  id: Scalars['Int'];
};


export type MutationLoginStudentArgs = {
  student: LoginStudentInput;
};


export type MutationCreateOneContractArgs = {
  contract: CreateOneContractInput;
};


export type MutationDeleteOneContractArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOneStudentArgs = {
  id: Scalars['Int'];
};


export type MutationUpsertOneSkillToStudentArgs = {
  skillToStudent: UpsertOneSkillToStudentInput;
};


export type MutationCreateManyStudentCsvArgs = {
  file: Scalars['Upload'];
};

export type Query = {
   __typename?: 'Query';
  groups: Array<Group>;
  students: Array<Student>;
  teachers: Array<Teacher>;
  marks: Array<Mark>;
  contracts: Array<Contract>;
  contract: Contract;
  student: Student;
  me: User;
  findManyContractNotFinishedByStudent: Array<Contract>;
};


export type QueryContractsArgs = {
  groups?: Maybe<Array<Scalars['Int']>>;
};


export type QueryContractArgs = {
  id: Scalars['Int'];
};


export type QueryStudentArgs = {
  id: Scalars['Int'];
};


export type QueryFindManyContractNotFinishedByStudentArgs = {
  studentId: Scalars['Int'];
};

export type Skill = {
   __typename?: 'Skill';
  contractId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  contract: Contract;
  skillToStudents: Array<SkillToStudent>;
  skillToStudent?: Maybe<SkillToStudent>;
};


export type SkillSkillToStudentArgs = {
  studentId: Scalars['Int'];
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

export type Student = {
   __typename?: 'Student';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  username: Scalars['Int'];
  skillsToStudent: Array<SkillToStudent>;
  groups: Array<Group>;
};


export type StudentSkillsToStudentArgs = {
  markFilter?: Maybe<Array<Scalars['String']>>;
};

export type Teacher = {
   __typename?: 'Teacher';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateOneContractInput = {
  name?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  rgb?: Maybe<Scalars['String']>;
  groupIds?: Maybe<Array<Scalars['Int']>>;
};

export type UpdateOneSkillInput = {
  name?: Maybe<Scalars['String']>;
};

export type UpdateOneStudentInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  groupIds?: Maybe<Array<Scalars['Int']>>;
};


export type UpsertOneSkillToStudentInput = {
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
  markValue: Scalars['String'];
};

export type User = Teacher | Student;

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

export type CreateOneContractMutationVariables = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  skills: Array<Scalars['String']>;
  name: Scalars['String'];
  rgb: Scalars['String'];
};


export type CreateOneContractMutation = (
  { __typename?: 'Mutation' }
  & { createOneContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'start'>
  ) }
);

export type DeleteContractMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteContractMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'id'>
  ) }
);

export type DeleteStudentMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteStudentMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneStudent: (
    { __typename?: 'Student' }
    & Pick<Student, 'id'>
  ) }
);

export type EditSkillToStudentMutationVariables = {
  markValue: Scalars['String'];
  skillId: Scalars['Int'];
  studentId: Scalars['Int'];
};


export type EditSkillToStudentMutation = (
  { __typename?: 'Mutation' }
  & { upsertOneSkillToStudent: (
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
    { __typename?: 'AuthPayloadTeacher' }
    & Pick<AuthPayloadTeacher, 'token'>
  ) }
);

export type UpdateContractGroupsMutationVariables = {
  contractId: Scalars['Int'];
  groups: Array<Scalars['Int']>;
};


export type UpdateContractGroupsMutation = (
  { __typename?: 'Mutation' }
  & { updateOneContract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents: Array<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'text' | 'value' | 'rgb'>
        ), student: (
          { __typename?: 'Student' }
          & Pick<Student, 'id' | 'firstName' | 'lastName'>
        ) }
      )> }
    )> }
  ) }
);

export type CreateGroupMutationVariables = {
  name: Scalars['String'];
};


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createOneGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
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
      & Pick<Contract, 'id' | 'start' | 'end' | 'name'>
      & { groups: Array<(
        { __typename?: 'Group' }
        & Pick<Group, 'id' | 'name'>
      )>, skills: Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents: Array<(
          { __typename?: 'SkillToStudent' }
          & { mark: (
            { __typename?: 'Mark' }
            & Pick<Mark, 'text' | 'value' | 'rgb'>
          ), student: (
            { __typename?: 'Student' }
            & Pick<Student, 'id' | 'firstName' | 'lastName'>
          ) }
        )> }
      )> }
    ) }
  ) }
);

export type DeleteSkillMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteSkillMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneSkill: (
    { __typename?: 'Skill' }
    & Pick<Skill, 'id'>
  ) }
);

export type EditSkillNameMutationVariables = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type EditSkillNameMutation = (
  { __typename?: 'Mutation' }
  & { updateOneSkill: (
    { __typename?: 'Skill' }
    & { contract: (
      { __typename?: 'Contract' }
      & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
      & { groups: Array<(
        { __typename?: 'Group' }
        & Pick<Group, 'id' | 'name'>
      )>, skills: Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name'>
        & { skillToStudents: Array<(
          { __typename?: 'SkillToStudent' }
          & { mark: (
            { __typename?: 'Mark' }
            & Pick<Mark, 'text' | 'value' | 'rgb'>
          ), student: (
            { __typename?: 'Student' }
            & Pick<Student, 'id' | 'firstName' | 'lastName'>
          ) }
        )> }
      )> }
    ) }
  ) }
);

export type CreateManyStudentWithCsvMutationVariables = {
  file: Scalars['Upload'];
};


export type CreateManyStudentWithCsvMutation = (
  { __typename?: 'Mutation' }
  & { createManyStudentCSV: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName' | 'username'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skillsToStudent: Array<(
      { __typename?: 'SkillToStudent' }
      & Pick<SkillToStudent, 'skillId'>
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'text' | 'value' | 'rgb'>
      ) }
    )>, skillsToStudentToFinish: Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )> }
  )> }
);

export type LoginStudentMutationVariables = {
  username: Scalars['Int'];
};


export type LoginStudentMutation = (
  { __typename?: 'Mutation' }
  & { loginStudent: (
    { __typename?: 'AuthPayloadStudent' }
    & Pick<AuthPayloadStudent, 'token'>
  ) }
);

export type UpdateStudentGroupsMutationVariables = {
  studentId: Scalars['Int'];
  groups: Array<Scalars['Int']>;
};


export type UpdateStudentGroupsMutation = (
  { __typename?: 'Mutation' }
  & { updateOneStudent: (
    { __typename?: 'Student' }
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id'>
    )> }
  ) }
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
  & { contract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudents: Array<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'text' | 'value' | 'rgb'>
        ), student: (
          { __typename?: 'Student' }
          & Pick<Student, 'id' | 'firstName' | 'lastName'>
        ) }
      )> }
    )> }
  ) }
);

export type FetchContractsQueryVariables = {};


export type FetchContractsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    )> }
  )> }
);

export type FetchContractsAwaitingFinishStudentQueryVariables = {
  studentId: Scalars['Int'];
};


export type FetchContractsAwaitingFinishStudentQuery = (
  { __typename?: 'Query' }
  & { findManyContractNotFinishedByStudent: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { skillToStudent?: Maybe<(
        { __typename?: 'SkillToStudent' }
        & { mark: (
          { __typename?: 'Mark' }
          & Pick<Mark, 'text' | 'value' | 'rgb' | 'icon'>
        ) }
      )> }
    )> }
  )> }
);

export type FetchStudentQueryVariables = {
  id: Scalars['Int'];
};


export type FetchStudentQuery = (
  { __typename?: 'Query' }
  & { student: (
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skillsToStudent: Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )>, skillsToStudentToFinish: Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )> }
  ) }
);

export type FetchStudentsQueryVariables = {};


export type FetchStudentsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName' | 'username'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skillsToStudent: Array<(
      { __typename?: 'SkillToStudent' }
      & Pick<SkillToStudent, 'skillId'>
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'text' | 'value' | 'rgb'>
      ) }
    )>, skillsToStudentToFinish: Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )> }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'Teacher' }
    & Pick<Teacher, 'email'>
  ) | (
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'firstName' | 'lastName'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skillsToStudent: Array<(
      { __typename?: 'SkillToStudent' }
      & { mark: (
        { __typename?: 'Mark' }
        & Pick<Mark, 'value' | 'text' | 'rgb' | 'icon'>
      ), skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )> }
  ) }
);

export type FindManyContractsOfGroupsQueryVariables = {
  groups: Array<Scalars['Int']>;
};


export type FindManyContractsOfGroupsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'rgb'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    )> }
  )> }
);

export type FindManyGroupsQueryVariables = {};


export type FindManyGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  )> }
);

export type FetchMarksQueryVariables = {};


export type FetchMarksQuery = (
  { __typename?: 'Query' }
  & { marks: Array<(
    { __typename?: 'Mark' }
    & Pick<Mark, 'text' | 'value' | 'rgb'>
  )> }
);
