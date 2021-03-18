import React, { Component, createRef } from 'react';
import './Page.css';
import { RealDrawBoard } from 'svg-real-renderer';
import hotkeys from 'hotkeys-js';
import SVGSaver from 'svgsaver';

import { Toolbar } from './Toolbar/Toolbar';

import '../Page/Page.css';

export class Page extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      boardState: {
        tool: 'brush'
      }
    }

    this.svgRef = createRef();
  }

  static boardOptions = {
    xScaleFactor: 1,
    yScaleFactor: 1,
    drawAxes: false,
    xOffset: 0,
    yOffset: 0,
    toolSettings: {
      brushSize: 3,
      lineThickness: 3,
      eraserSize: 30,
      changeRate: 5
    },
    allowUndo: true,
    maxSnapshots: 10
  }

  componentDidMount() {
    this.setState({
      boardState: {
        ...this.state.boardState,
        drawBoard: new RealDrawBoard({
          svg: this.svgRef.current,
          dimensions: [
            this.svgRef.current.clientWidth,
            this.svgRef.current.clientHeight
          ],
          ...Page.boardOptions,
          toolSettings: {
            ...Page.boardOptions.toolSettings,
            brushColor: this.props.getTheme() === 'white' ? [0, 0, 0] : [1, 1, 1],
            lineColor: this.props.getTheme() === 'white' ? [0, 0, 0] : [1, 1, 1],
          },
          bgColor: this.props.getTheme() === 'white' ? [1, 1, 1] : [0, 0, 0],
        }).draw().startRender()
      }
    })

    if (!navigator.userAgent.toLowerCase().includes('electron')) {
      window.onbeforeunload = function() {
        return `Do you want to leave this page? You may lose saved changes.`;
      }
    }

    this._removeHotkeys();
    this._setHotkeys();
  }

  componentWillUnmount() {
    window.onbeforeunload = () => {};
    this._removeHotkeys();
  }

  _setTool(tool) {
    this.state.boardState.drawBoard.changeTool(tool);
    this.setState({
      boardState: {
        ...this.state.boardState,
        tool
      }
    })
  }

  _clearBoard() {
    this.state.boardState.drawBoard.clear();
  }

  _save(type) {
    const svgSaver = new SVGSaver();
    if (type === 'svg') svgSaver.asSvg(this.svgRef.current, 'slide.svg');
    else svgSaver.asPng(this.svgRef.current, 'slide');
  }

  _setHotkeys() {
    hotkeys('ctrl+z, command+z', 'drawboard', () => {
      this.state.boardState.drawBoard.undo();
    })

    hotkeys('ctrl+shift+z, command+shift+z', 'drawboard', () => {
      this.state.boardState.drawBoard.redo();
    })

    hotkeys('ctrl+s, command+s', 'drawboard', (e) => {
      e.preventDefault();
      this._save();
    })

    hotkeys.setScope('drawboard');
  }

  _removeHotkeys() {
    hotkeys.deleteScope('drawboard');
  }

  render() {
    return (
      <div>
        <svg className="page" ref={this.svgRef}></svg>

        <Toolbar
          boardOptions={Page.boardOptions}
          boardState={this.state.boardState}
          initialBrushColor={this.props.getTheme() === 'white' ? [0, 0, 0] : [1, 1, 1]}
          _setTool={(tool) => this._setTool(tool)}
          _save={(type) => this._save(type)}
          _clearBoard={() => this._clearBoard()}
          _onUndo={() => this.state.boardState.drawBoard.undo()}
          _onRedo={() => this.state.boardState.drawBoard.redo()}
          onBrushSizeChange={(size) => this.state.boardState.drawBoard.changeBrushSize(size)}
          onEraserSizeChange={(size) => this.state.boardState.drawBoard.changeEraserSize(size)}
          _changeToolSetting={(property, newValue) => this.state.boardState.drawBoard.changeToolSetting(property, newValue)}
        />
      </div>
    )
  }
}

export default Page;
