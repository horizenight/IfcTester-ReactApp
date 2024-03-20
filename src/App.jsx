import { useState } from "react";
import "./App.css";

const App= () => {
  // this state caputres the .idsMetadata Fields
  const [idsMetadata, setIdsMetadata] = useState(null);
  // handles the click of LoadIds button
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
        specifications: {},
      },
    };
    console.log(mockApiResponse.idsData);
    // sets the metadata 
    setIdsMetadata(mockApiResponse.idsData);
  };

  return (
    <div>
      <button onClick={handleLoadIds}>Load Ids</button>
      {/* checks if idsMetadata exists then only render the component */}
      {idsMetadata && (
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
                {idsMetadata.copyright}
              </ids-info-element>
            </p>
          </ids-info>
      )}
    </div>
  );
};

export default App;
