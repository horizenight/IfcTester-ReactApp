import { useState } from "react";
import "./App.css";
import Spec from "./components/Spec";

const App = () => {
  const handleLoadIds = () => {
    const mockApiResponse = {
      idsData: {
        title: "buildingSMART Sample IDS",
        identifier: "23b0270b-49a0-4a74-8be0-08902457c25c",
        copyright: "buildingSMART",
        version: "1.0.0",
        description:
          "These are example specifications for those learning how to use IDS",
        author: "foo@bar.com",
        date: "2022-01-01",
        purpose: "Contractual requirements",
        milestone: null,
        specifications: [
          {
            identifier: "e50ca332-11bc-477d-83a7-b397b96fa06d",
            name: "Project naming",
            description:
              "Projects shall be named correctly for the purposes of identification, project archival, and model federation.",
            instructions:
              "Each discipline is responsible for naming their own project.",
            ifcVersion: ["IFC4"],
            necessity: "optional",
            applicability: {
              entity: {
                "d89c23a8-900e-4670-b19a-78ae209b1e6b": {
                  filterType: "applicability",
                  identifier: "d89c23a8-900e-4670-b19a-78ae209b1e6b",
                  necessity: "required",
                  name: ["IFCPROJECT"],
                  matchTypeName: "simpleValue",
                  predefinedType: [],
                  matchTypePredefinedType: "simpleValue",
                  instructions: null,
                  facetType: "entity",
                  status: null,
                  failedEntities: [],
                  failedReasons: [],
                },
              },
              partOf: {},
              classification: {},
              attribute: {},
              property: {},
              material: {},
            },
            applicableEntities: [],
            failedEntities: [],
            requirements: {
              entity: {},
              partOf: {},
              classification: {},
              attribute: {
                "d80968e4-585a-49c2-8cc8-c0ef07b3562f": {
                  filterType: "requirements",
                  identifier: "d80968e4-585a-49c2-8cc8-c0ef07b3562f",
                  necessity: "required",
                  name: ["Name"],
                  matchTypeName: "simpleValue",
                  value: ["TEST"],
                  matchTypeValue: "simpleValue",
                  instructions:
                    "The project manager shall confirm the short project code with the client based on their real estate portfolio naming scheme.",
                  facetType: "attribute",
                  status: null,
                  failedEntities: [],
                  failedReasons: [],
                },
              },
              property: {},
              material: {},
            },
            status: null,
          },
          {
            identifier: "7d03fa8b-a83f-4d6b-9ca5-32c187ec9223",
            name: "Fire rating",
            description:
              "All objects must have a fire rating for building compliance checks and to know the protection strategies needed for any penetrations.",
            instructions:
              "The architect is responsible for including this data.",
            ifcVersion: ["IFC4"],
            necessity: "optional",
            applicability: {
              entity: {
                "ec77bc9b-a3e5-4394-9254-b09a8222fb88": {
                  filterType: "applicability",
                  identifier: "ec77bc9b-a3e5-4394-9254-b09a8222fb88",
                  necessity: "required",
                  name: ["IFCWALLTYPE"],
                  matchTypeName: "simpleValue",
                  predefinedType: [],
                  matchTypePredefinedType: "simpleValue",
                  instructions: null,
                  facetType: "entity",
                  status: null,
                  failedEntities: [],
                  failedReasons: [],
                },
              },
              partOf: {},
              classification: {},
              attribute: {},
              property: {},
              material: {},
            },
            applicableEntities: [],
            failedEntities: [],
            requirements: {
              entity: {},
              partOf: {},
              classification: {},
              attribute: {},
              property: {
                "154b53c8-a6be-44ce-9204-c2730670b6ff": {
                  filterType: "requirements",
                  identifier: "154b53c8-a6be-44ce-9204-c2730670b6ff",
                  necessity: "required",
                  psetName: ["Pset_WallCommon"],
                  matchTypePsetName: "simpleValue",
                  name: ["FireRating"],
                  matchTypeName: "simpleValue",
                  value: ["(-|[0-9]{2,3})\\/(-|[0-9]{2,3})\\/(-|[0-9]{2,3})"],
                  matchTypeValue: "regex",
                  dataType: "IfcLabel",
                  instructions:
                    "Fire rating is specified using the Fire Resistance Level as defined in the Australian National Construction Code (NCC) 2019. Valid examples include -/-/-, -/120/120, and 60/60/60",
                  facetType: "property",
                  status: null,
                  failedEntities: [],
                  failedReasons: [],
                },
              },
              material: {},
            },
            status: null,
          },
        ],
      },
    };
    const {
      title,
      identifier,
      copyright,
      version,
      description,
      author,
      date,
      purpose,
      milestone,
    } = mockApiResponse.idsData;
    setIdsMetadata({
      title,
      identifier,
      copyright,
      version,
      description,
      author,
      date,
      purpose,
      milestone,
    });
    setSpecsList(mockApiResponse.idsData.specifications);
  };

  const [idsMetadata, setIdsMetadata] = useState(null);
  const [specsList, setSpecsList] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const dragStart = (id) => {
    setDragItem(id);
  };
  const dragEnter = (id) => {
    setDragOverItem(id);
  };

  const drop = () => {
    if (dragItem !== null && dragOverItem !== null) {
      const dragIndex = specsList.findIndex(
        (item) => item.identifier === dragItem
      );
      const dragOverIndex = specsList.findIndex(
        (item) => item.identifier === dragOverItem
      );

      const updatedSpecsList = [...specsList];
      const temp = updatedSpecsList[dragIndex];
      updatedSpecsList[dragIndex] = updatedSpecsList[dragOverIndex];
      updatedSpecsList[dragOverIndex] = temp;

      setSpecsList(updatedSpecsList);

      setDragItem(null);
      setDragOverItem(null);
    }
  };

  return (
    <div>
      <button onClick={handleLoadIds}>Load Ids</button>
      {idsMetadata && (
        <>
          <ids-info>
            <h1>
              <ids-info-element contenteditable="true" name="title">
                {idsMetadata.title}
              </ids-info-element>
            </h1>
            <p>
              <i data-feather="mail"></i>
              <ids-info-element contenteditable="true" name="author">
                {idsMetadata.author}
              </ids-info-element>
              <i data-feather="tag"></i>
              <ids-info-element contenteditable="true" name="version">
                {idsMetadata.version}
              </ids-info-element>
              <i data-feather="calendar"></i>
              <ids-info-element contenteditable="true" name="date">
                {new Date(idsMetadata.date).toLocaleDateString()}
              </ids-info-element>
              <i data-feather="crosshair"></i>
              <ids-info-element contenteditable="true" name="milestone">
                {idsMetadata.milestone}
              </ids-info-element>
            </p>
            <p>
              <ids-info-element contenteditable="true" name="description">
                {idsMetadata.description}
              </ids-info-element>
            </p>
            <p>
              <ids-info-element contenteditable="true" name="purpose">
                {idsMetadata.purpose}
              </ids-info-element>
            </p>
            <p>
              &copy;{" "}
              <ids-info-element contenteditable="true" name="copyright">
                Company Inc.
              </ids-info-element>
            </p>
          </ids-info>
        </>
      )}
      {specsList.map((item, index) => (
        <div
          draggable
          onDragStart={(e) => dragStart(item.identifier)}
          onDragEnter={(e) => dragEnter(item.identifier)}
          onDragEnd={drop}
        >
          <button>move</button>
          {
            <Spec
              item={item}
              index={index}
              specsList={specsList}
              setSpecsList={setSpecsList}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default App;
