import React, { Component } from 'react';
import packageFile from '../../../../package.json';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

import { Header } from '../Header/Header';

const { repository } = packageFile;

function Credit(
  {title, desc, link, size = 1}: {
    title: string | JSX.Element,
    desc: string | JSX.Element,
    link: string,
    size?: number
  }
) {
  return (
    <GridItem options={{width: size}}>
      <div className="card full-height-card center">
        <div className="card-content">
          <span className="card-title styled-text brand-text">{title}</span>
          <p>{desc}</p>
        </div>
        <div className="card-action">
          <a target="_blank" rel="noreferrer" href={link}>Link</a>
        </div>
      </div>
    </GridItem>
  )
}

export default class Credits extends Component {
  render() {
    return (
      <div style={{paddingBottom: '2rem'}}>
        <Header
          title="Credits"
          leftMenu={['home']}
        />

        <Grid
          className="container"
          options={{
            numColumns: 3
          }}
        >
          <Credit
            title="Electron"
            desc="Used to create the desktop version of the app."
            link="https://electronjs.org"
          />
          <Credit
            title="React"
            desc="Used to create the UI."
            link="https://reactjs.org"
          />
          <Credit
            title="SVG Real Renderer"
            desc="Used to make the whiteboard work."
            link="https://harshkhandeparkar.github.io/svg-real-renderer"
          />

          <Credit
            title="Electron Builder"
            desc="Used to package the app for different operating systems."
            link="https://electron.build"
          />

          <Credit
            title="Materialize CSS"
            desc="Used to make the UI look cool."
            link="https://materializecss.com"
          />
          <Credit
            title="Font Awesome"
            desc="Awesome icons."
            link="https://fontawesome.com"
          />
          <Credit
            title="React Color"
            desc="Simple color palette."
            link="https://casesandberg.github.io/react-color/"
          />

          <Credit
            title="SVG Saver"
            desc="Used to export the page as PNG and SVG."
            link="https://github.com/Hypercubed/svgsaver"
          />

          <Credit
            title="GIMP"
            desc="Used to create the logo."
            link="https://gimp.org"
          />
          <Credit
            size={2}
            title="Contributors"
            desc="Code Contributors."
            link={repository + '/graphs/contributors'}
          />
          <Credit
            title="Full List of Libraries"
            desc="Complete list of dependencies used."
            link="https://github.com/harshkhandeparkar/rainbow-board/network/dependencies"
          />
        </Grid>
      </div>
    )
  }
}
