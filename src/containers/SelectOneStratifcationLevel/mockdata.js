export const stratificationlevelMock = [
  {
    id: 1,
    name: 'State',
    abbreviation: 'ST',
    geographicTypeId: 1,
    stratificationType: []
  },
  {
    id: 3,
    name: 'State x Age',
    abbreviation: 'ST_AG',
    geographicTypeId: 1,
    stratificationType: [
      {
        id: 3,
        name: 'Age Group',
        abbreviation: 'AG',
        columnName: 'AgeBandId'
      }
    ]
  }
];

export const measurestratificationMock = [
  {
    displayName: 'Age Group',
    isDisplayed: true,
    isRequired: false,
    isGrouped: false,
    isStratificationSelectable: false,
    stratificationItem: [
      {
        name: '18 to 24',
        longName: '18 to 24',
        isDefault: false,
        useLongName: false,
        localId: 1
      },
      {
        name: '25 to 34',
        longName: '25 to 34',
        isDefault: false,
        useLongName: false,
        localId: 2
      },
      {
        name: '35 to 44',
        longName: '35 to 44',
        isDefault: false,
        useLongName: false,
        localId: 3
      },
      {
        name: '45 to 54',
        longName: '45 to 54',
        isDefault: false,
        useLongName: false,
        localId: 4
      },
      {
        name: '55 to 64',
        longName: '55 to 64',
        isDefault: false,
        useLongName: false,
        localId: 5
      },
      {
        name: '65 or older',
        longName: '65 or older',
        isDefault: false,
        useLongName: false,
        localId: 6
      }
    ],
    columnName: 'AgeBandId',
    stratificationTypeId: 3
  }
];

export const optionsMock = [
  {
    id: 1,
    name: 'State',
    abbreviation: 'ST',
    geographicTypeId: 1,
    stratificationType: []
  },
  {
    id: 4,
    name: 'State x Gender',
    abbreviation: 'ST_GN',
    geographicTypeId: 1,
    stratificationType: [
      {
        id: 4,
        name: 'Gender',
        abbreviation: 'GN',
        columnName: 'GenderId'
      }
    ]
  },
  {
    id: 8,
    name: 'State x Race/Ethnicity',
    abbreviation: 'ST_RE',
    geographicTypeId: 1,
    stratificationType: [
      {
        id: 2,
        name: 'Race/Ethnicity',
        abbreviation: 'RE',
        columnName: 'RaceEthnicityId'
      }
    ]
  },
  {
    id: 43,
    name: 'State x Gender x Race/Ethnicity',
    abbreviation: 'ST_GN_RE',
    geographicTypeId: 1,
    stratificationType: [
      {
        id: 2,
        name: 'Race/Ethnicity',
        abbreviation: 'RE',
        columnName: 'RaceEthnicityId'
      },
      {
        id: 4,
        name: 'Gender',
        abbreviation: 'GN',
        columnName: 'GenderId'
      }
    ]
  }
];

export const stratificationsMock = [
  {
    displayName: 'Gender',
    isDisplayed: true,
    isRequired: false,
    isGrouped: false,
    isStratificationSelectable: false,
    stratificationItem: [
      {
        name: 'Male',
        longName: 'Male',
        isDefault: false,
        useLongName: false,
        localId: 1
      },
      {
        name: 'Female',
        longName: 'Female',
        isDefault: false,
        useLongName: false,
        localId: 2
      }
    ],
    columnName: 'GenderId',
    stratificationTypeId: 4
  },
  {
    displayName: 'Race Ethnicity',
    isDisplayed: true,
    isRequired: false,
    isGrouped: false,
    isStratificationSelectable: false,
    stratificationItem: [
      {
        name: 'Asian/Pacific Islander (includes Hispanic)',
        longName: 'Asian/Pacific Islander (includes Hispanic)',
        isDefault: false,
        useLongName: false,
        localId: 1
      },
      {
        name: 'Black (includes Hispanic)',
        longName: 'Black (includes Hispanic)',
        isDefault: false,
        useLongName: false,
        localId: 2
      },
      {
        name: 'Hispanic (all races)',
        longName: 'Hispanic (all races)',
        isDefault: false,
        useLongName: false,
        localId: 3
      },
      {
        name: 'American Indian/Alaskan Native (includes Hispanic)',
        longName: 'American Indian/Alaskan Native (includes Hispanic)',
        isDefault: false,
        useLongName: false,
        localId: 4
      },
      {
        name: 'White (includes Hispanic)',
        longName: 'White (includes Hispanic)',
        isDefault: false,
        useLongName: false,
        localId: 5
      }
    ],
    columnName: 'RaceEthnicityId',
    stratificationTypeId: 2
  }
];

export const expectedParameterOptions = [
  {
    value: 'RaceEthnicityId',
    label: 'Race Ethnicity',
    children: [
      {
        value: 'RaceEthnicityId=1',
        label: 'Asian/Pacific Islander (includes Hispanic)'
      },
      {
        value: 'RaceEthnicityId=2',
        label: 'Black (includes Hispanic)'
      },
      {
        value: 'RaceEthnicityId=3',
        label: 'Hispanic (all races)'
      },
      {
        value: 'RaceEthnicityId=4',
        label: 'American Indian/Alaskan Native (includes Hispanic)'
      },
      {
        value: 'RaceEthnicityId=5',
        label: 'White (includes Hispanic)'
      }
    ]
  },
  {
    value: 'GenderId',
    label: 'Gender',
    children: [
      {
        value: 'GenderId=1',
        label: 'Male'
      },
      {
        value: 'GenderId=2',
        label: 'Female'
      }
    ]
  }
];
