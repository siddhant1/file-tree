import React, { useState } from "react";
import logo from "./logo.svg";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaFolder, FaRegFolderOpen } from "react-icons/fa";
import { GoFileCode } from "react-icons/go";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./styles.css";

function App() {
  return (
    <div className="dir">
      <DirectoryTreeView />
    </div>
  );
}

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }]
    },
    {
      name: "node_modules",
      children: [
        {
          name: "react-accessible-treeview",
          children: [{ name: "" }]
        },
        { name: "react", children: [{ name: "index.js" }] }
      ]
    },
    {
      name: ".npmignore"
    },
    {
      name: "package.json"
    },
    {
      name: "webpack.config.js"
    }
  ]
};
const data = flattenTree(folder);
function DirectoryTreeView() {
  return (
    <div>
      <div className="directory">
        <TreeView
          data={data}
          aria-label="directory tree"
          onBlur={({ treeState, dispatch }) => {
            dispatch({
              type: "DESELECT",
              id: Array.from(treeState.selectedIds)[0]
            });
          }}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}
              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}
const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <span>
      <FiChevronDown color="#738f93" className="icon" />
      <FaFolder color="#738f93" className="icon" />
    </span>
  ) : (
    <span>
      <FiChevronRight color="#738f93" className="icon" />
      <FaFolder color="#738f93" className="icon" />
    </span>
  );
const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <GoFileCode color="#738f93" className="icon" />;
    case "css":
      return <GoFileCode color="#738f93" className="icon" />;
    case "json":
      return <GoFileCode color="#738f93" className="icon" />;
    case "npmignore":
      return <GoFileCode color="#738f93" className="icon" />;
    default:
      return null;
  }
};

export default App;
