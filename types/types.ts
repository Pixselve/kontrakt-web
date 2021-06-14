export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Contract = {
  __typename?: 'Contract';
  archived: Scalars['Boolean'];
  end: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  hexColor: Scalars['String'];
  start: Scalars['String'];
  skills: Array<Skill>;
  groups: Array<Group>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['Int'];
  name: Scalars['String'];
  contracts: Array<Contract>;
  students: Array<Student>;
};

export enum Mark {
  Todo = 'TODO',
  Good = 'GOOD',
  Bad = 'BAD'
}

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  contracts: Array<Contract>;
  groups: Array<Group>;
  student: Student;
  contract: Contract;
  students: Array<Student>;
  teachers: Array<Teacher>;
  me: User;
  studentSkills: Array<StudentSkill>;
};


export type QueryContractsArgs = {
  groupIds?: Maybe<Array<Scalars['Int']>>;
};


export type QueryStudentArgs = {
  ownerUsername: Scalars['String'];
};


export type QueryContractArgs = {
  id: Scalars['Int'];
};


export type QueryStudentSkillsArgs = {
  studentUsername: Scalars['String'];
  contractID?: Maybe<Scalars['Int']>;
};

export enum Role {
  Teacher = 'TEACHER',
  Student = 'STUDENT',
  Admin = 'ADMIN'
}

export type Skill = {
  __typename?: 'Skill';
  contractId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  contract: Contract;
  studentSkills: Array<StudentSkill>;
};

export type Student = {
  __typename?: 'Student';
  owner: User;
  ownerUsername: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  studentSkills: Array<StudentSkill>;
  groups: Array<Group>;
};

export type StudentSkill = {
  __typename?: 'StudentSkill';
  skillID: Scalars['Int'];
  studentID: Scalars['String'];
  mark: Mark;
  skill: Skill;
  student: Student;
};

export type Teacher = {
  __typename?: 'Teacher';
  owner: User;
  ownerUsername: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  role: Role;
  student: Array<Student>;
  teacher: Array<Teacher>;
};

export type ContractsDatesOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractsDatesOnlyQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'start' | 'id' | 'name' | 'end' | 'hexColor'>
  )> }
);

export type FetchContractQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FetchContractQuery = (
  { __typename?: 'Query' }
  & { contract: (
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'hexColor'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & { studentSkills: Array<(
        { __typename?: 'StudentSkill' }
        & Pick<StudentSkill, 'mark'>
      )> }
    )> }
  ) }
);

export type FetchContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchContractsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'hexColor'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    )> }
  )> }
);

export type FetchContractsAwaitingFinishStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchContractsAwaitingFinishStudentQuery = (
  { __typename?: 'Query' }
  & { student: (
    { __typename?: 'Student' }
    & Pick<Student, 'ownerUsername'>
  ) }
);

export type FetchStudentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchStudentQuery = (
  { __typename?: 'Query' }
  & { student: (
    { __typename?: 'Student' }
    & Pick<Student, 'ownerUsername' | 'firstName' | 'lastName'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, studentSkills: Array<(
      { __typename?: 'StudentSkill' }
      & Pick<StudentSkill, 'mark'>
      & { skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      ) }
    )> }
  ) }
);

export type FetchStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchStudentsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'ownerUsername' | 'firstName' | 'lastName'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, studentSkills: Array<(
      { __typename?: 'StudentSkill' }
      & Pick<StudentSkill, 'skillID' | 'mark'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { student: (
    { __typename?: 'Student' }
    & Pick<Student, 'ownerUsername'>
  ) }
);

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = (
  { __typename?: 'Query' }
  & { student: (
    { __typename?: 'Student' }
    & Pick<Student, 'ownerUsername'>
  ) }
);

export type StudentSkillsQueryVariables = Exact<{
  studentUsername: Scalars['String'];
}>;


export type StudentSkillsQuery = (
  { __typename?: 'Query' }
  & { studentSkills: Array<(
    { __typename?: 'StudentSkill' }
    & Pick<StudentSkill, 'mark'>
    & { skill: (
      { __typename?: 'Skill' }
      & Pick<Skill, 'name' | 'id'>
    ) }
  )> }
);

export type FindManyContractsOfGroupsQueryVariables = Exact<{
  groups: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type FindManyContractsOfGroupsQuery = (
  { __typename?: 'Query' }
  & { contracts: Array<(
    { __typename?: 'Contract' }
    & Pick<Contract, 'id' | 'start' | 'end' | 'name' | 'hexColor'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    )> }
  )> }
);

export type FindManyGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  )> }
);
