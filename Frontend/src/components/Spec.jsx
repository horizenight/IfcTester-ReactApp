
const Spec= ({item,index,specsList,setSpecsList}) => {

  const handleAddSpecs = () => {
    const newSpecs = {
      identifier: (Math.random() * 10000).toString(),
      name: "Project Name",
      description: "Describe why the requirement is important to the project.",
      instructions: "Provide instructions on who is responsible and how to achieve it.",
      ifcVersion: ["IFC4"],
      necessity: "optional",
      applicability: {},
      status: null,
    };
    const updatedSpecsList = [...specsList];
    updatedSpecsList.splice(index + 1, 0, newSpecs);
    setSpecsList(updatedSpecsList)
  };

  const handleDownSpecs = () => {
    if (index < specsList.length - 1) {
      setSpecsList(prevList => {
        const newList = [...prevList];
        [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
        return newList;
      });
    }
  };

  const handleUpSpecs = () => {
    if (index > 0) {
      setSpecsList(prevList => {
        const newList = [...prevList];
        [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
        return newList;
      });
    }
  };

    return (
      <>
        <ids-specs>
          <ids-spec>
            <ids-spec-target></ids-spec-target>
            <h2>
            {/* <span>{item.identifier}{" "}</span> */}
              <a href="#">
                <i data-feather="play"></i>
              </a>
              <ids-spec-handle className="draggable" draggable="true">
                <i data-feather="move"></i>
              </ids-spec-handle>
              <ids-spec-remove>
                <i data-feather="x"></i>
              </ids-spec-remove>
              <ids-spec-attribute name="name">
              {item.name}
              </ids-spec-attribute>
            </h2>
            <div className="spec-contents">
              <p className="spec-description">
                <ids-spec-attribute name="description">
                {item.description}
                </ids-spec-attribute>
              </p>
              <p>
                <ids-spec-attribute name="instructions">
                {item.instructions}
                </ids-spec-attribute>
              </p>
              <h3>
                <span className="controls">
                  <ids-facet-add>
                    <i data-feather="plus"></i>
                  </ids-facet-add>
                </span>
                Applies to:
              </h3>
  
              <ids-facets name="applicability">
                <div className="facet">
                  <span>
                  </span>
                  <ids-facet type="applicability">I am a facet here</ids-facet>
                </div>
              </ids-facets>
              <h3>
                <span className="controls">
                  <ids-facet-add>
                    <i data-feather="plus"></i>
                  </ids-facet-add>
                </span>
                Requirements:
              </h3>
  
              <ids-facets name="requirements">
                <div className="facet">
                  <span className="facet-controls">
                    <ids-facet-remove></ids-facet-remove>
                  </span>
                  <ids-result name="fail" className="result-icon">
                  </ids-result>
                  <ids-result name="pass" className="result-icon"></ids-result>
                  <ids-facet type="requirement"></ids-facet>
                  <ids-facet-instructions
                    className="requirement-instructions"
                    title="Instructions"
                  >
                    Optionally write instructions about how to achieve this
                    requirement.
                  </ids-facet-instructions>
                </div>
              </ids-facets>
            </div>
            <div className="divider">
              <span className="placeholder">
                <i data-feather="align-justify"></i>
              </span>
              <span>
                <button onClick={handleAddSpecs}>Add</button>
                <button onClick={handleDownSpecs}>Down</button>
                <button onClick={handleUpSpecs}>Up</button>
              </span>
            </div>
          </ids-spec>
        </ids-specs>
      </>
    );
  };

  export default Spec

