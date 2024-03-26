import { useState } from "react";
import "./App.css";
import Spec from "./components/Spec";




const customSpecsExample= [
  {
    "identifier": "a12b34cd-5678-90ef-ghij-klmn1234",
    "name": "Material Usage",
    "description": "All materials must be specified accurately to ensure construction quality and regulatory compliance.",
    "instructions": "Responsibility for material specification lies with the structural engineer.",
    "ifcVersion": [
      "IFC4"
    ],
    "necessity": "mandatory",
    "applicability": {
      "entity": {
        "e56f78ab-c901-23de-4567-89ab-cdef56789012": {
          "filterType": "applicability",
          "identifier": "e56f78ab-c901-23de-4567-89ab-cdef56789012",
          "necessity": "required",
          "name": [
            "IFCBEAM"
          ],
          "matchTypeName": "simpleValue",
          "predefinedType": [],
          "matchTypePredefinedType": "simpleValue",
          "instructions": null,
          "facetType": "entity",
          "status": null,
          "failedEntities": [],
          "failedReasons": []
        }
      },
      "partOf": {},
      "classification": {},
      "attribute": {},
      "property": {},
      "material": {}
    },
    "applicableEntities": [],
    "failedEntities": [],
    "requirements": {
      "entity": {},
      "partOf": {},
      "classification": {},
      "attribute": {},
      "property": {
        "f90123de-4567-89ab-cdef-012345678901": {
          "filterType": "requirements",
          "identifier": "f90123de-4567-89ab-cdef-012345678901",
          "necessity": "required",
          "psetName": [
            "Pset_BeamCommon"
          ],
          "matchTypePsetName": "simpleValue",
          "name": [
            "Material"
          ],
          "matchTypeName": "simpleValue",
          "value": [
            "Steel",
            "Concrete",
            "Timber"
          ],
          "matchTypeValue": "list",
          "dataType": "IfcLabel",
          "instructions": "Specify material type as Steel, Concrete, or Timber as appropriate for the beam.",
          "facetType": "property",
          "status": null,
          "failedEntities": [],
          "failedReasons": []
        }
      },
      "material": {}
    },
    "status": null
  }
]


const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target);
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("ids", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/loadIds", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const responseData = await response.json();
      setIdsMetadata(responseData.data.idsData);
      setSpecsList(responseData.data.idsData.specifications);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [idsMetadata, setIdsMetadata] = useState(null);
  const [specsList, setSpecsList] = useState([]);
  const [customSpecs,setCustomSpecs] = useState(customSpecsExample);
  const [dragItem, setDragItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const dragStart = (id) => {
    setDragItem(id);
    console.log('dragging',id)
  };
  const dragEnter = (id) => {
    setDragOverItem(id);
    console.log('drag-over',id)

  };


  const drop = () => {
    if (dragItem !== null && dragOverItem !== null) {
      let updatedSpecsList = [...specsList];
      const dragIndex = specsList.findIndex(item => item.identifier === dragItem);
      const dragOverIndex = specsList.findIndex(item => item.identifier === dragOverItem);
  
      if (dragOverIndex === -1) {
        // If the drag-over item is not found in specsList, do nothing
        setDragItem(null);
        setDragOverItem(null);
        return;
      }
  
      if (dragIndex !== -1 && dragOverIndex !== -1) {
        const draggedItem = updatedSpecsList.splice(dragIndex, 1)[0];
        updatedSpecsList.splice(dragOverIndex, 0, draggedItem);
        setSpecsList(updatedSpecsList);
      } else {
        const customDragIndex = customSpecs.findIndex(item => item.identifier === dragItem);
        const customDraggedItem = customSpecs[customDragIndex];
        
        if (customDraggedItem) {
          const clonedItem = { ...customDraggedItem, identifier: Math.random() };
          updatedSpecsList.splice(dragOverIndex, 0, clonedItem);
          setSpecsList(updatedSpecsList);
        }
      }
  
      setDragItem(null);
      setDragOverItem(null);
    }
  };
  
  
  
  
  

  return (
    <div className='ids-body'>
    <div className="ids-container">

    
      <h4>
        Upload only this sample.ids{" "}
        <a>
          https://raw.githubusercontent.com/buildingSMART/IDS/master/Documentation/library/sample.ids
        </a>
      </h4>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Load Ids</button>
      </form>
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
          key={item.identifier}
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
      <div className="ids-container"></div>
      <div className="ids-container">
      <h1>
       Specs Library
      </h1>
      {customSpecs.map((item, index) => (
        <div
          draggable
          onDragStart={(e) => dragStart(item.identifier)}
          onDragEnter={(e) => dragEnter(item.identifier)}
          onDragEnd={drop}
          key={item.identifier}
        >
          <button>move</button>
          {
            <Spec
              item={item}
              index={index}
              specsList={customSpecs}
              setSpecsList={setCustomSpecs}
            />
          }
        </div>
      ))}
      </div>


    
    </div>
  );
};

export default App;
