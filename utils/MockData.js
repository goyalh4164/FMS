const mData = [
  {
    branch: "Branch 1",
    chipset: "Chipset 1",
    swModel: "S/W Model 1",
    changelistType: "Changelist Type 1",
    changelistNumber: "Changelist Number 1",
    releaseDate: "2024-06-01",
    status: "Inactive",
    colors: {
      chipset: "lightblue", // Chipset cell override
    },
  },
  {
    branch: "Branch 2",
    chipset: "Chipset 2",
    swModel: "S/W Model 2",
    changelistType: "Changelist Type 2",
    changelistNumber: "Changelist Number 2",
    releaseDate: "2024-06-05",
    status: "Active",
    colors: {
      branch: "lightgreen", // Branch cell override
      status: "lightpink",  // Status cell override
    },
  },
  {
    branch: "Branch 3",
    chipset: "Chipset 3",
    swModel: "S/W Model 3",
    changelistType: "Changelist Type 3",
    changelistNumber: "Changelist Number 3",
    releaseDate: "2024-06-08",
    status: "Pending",
    colors: {
      releaseDate: "khaki", // Release date cell override
    },
  },
  {
    branch: "Branch 4",
    chipset: "Chipset 4",
    swModel: "S/W Model 4",
    changelistType: "Changelist Type 4",
    changelistNumber: "Changelist Number 4",
    releaseDate: "2024-06-10",
    status: "Completed",
    // no custom colors
  },
];

export default mData;
