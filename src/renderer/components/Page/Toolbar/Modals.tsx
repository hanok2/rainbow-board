import React, { useState } from 'react';
import PaintSettings from '../../PaintSettings/PaintSettings';

import { getRGBColorString } from 'svg-real-renderer/build/src/util/getRGBColorString';
import { Tool, ToolSettings } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { Color } from 'svg-real-renderer/build/src/types/RealRendererTypes';
import { RealDrawBoard } from 'svg-real-renderer';

export const ColorPaletteModal = (
  props: {
    toolInfo: [
      colorVal: Color,
      propertyTitle: string
    ];
    show: boolean;
    onColor: (color: Color) => void;
    onClose: () => void;
  }
) => {
  const { toolInfo, onColor, onClose, show } = props;

  return (
    <>
      <div className="modal-content">
        {
          show ?
            <PaintSettings
              color={getRGBColorString(toolInfo[0])}
              propertyTitle={toolInfo[1]}
              onPickColor={color => {
                const colorArr: Color = [color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255];
                onColor(colorArr);
              }}
            /> :
            <div className="brand-text">This tool has no color property.</div>
        }

      </div>

      <div className="modal-footer container">
        <button title="Close (ESC)" className="btn brand-text" onClick={() => onClose()}>Close</button>
      </div>
    </>
  )
}

export const ExportPageModal = (
  props: {
    onClose: () => void;
    _export: (exportType: 'svg' | 'png') => void;
  }
) => {
  const [exportType, setExportType] = useState<'svg' | 'png'>('png');

  return (
    <>
      <div className="modal-content container-fluid">
        <h3>Export Page</h3>
        <p>Export the current page as an image.</p>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div
                className={`export-type ${exportType === 'png' ? 'selected' : ''}`}
                onClick={() => setExportType('png')}
              >
                <h6>PNG</h6>
                Exports as a normal image. Works everywhere. Default and recommended for most users.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div
                className={`export-type ${exportType === 'svg' ? 'selected' : ''}`}
                onClick={() => setExportType('svg')}
              >
                <h6>SVG</h6>
                Exports the page as an <a href="https://en.wikipedia.org/wiki/SVG" rel="noreferrer" style={{display: 'inline'}} target="_blank">SVG</a>. Use it if you know what it is.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer container">
        <button className="btn right" title="Cancel (ESC)" onClick={() => props.onClose()}>Cancel</button>
        <button
          className="btn brand-text left"
          title="Export"
          onClick={() => {
            props._export(exportType);
            props.onClose();
          }}
        >Export</button>
      </div>
    </>
  )
}
