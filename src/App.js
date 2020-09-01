import React from 'react';

import './App.css';

import * as topojson from 'topojson-client';
import * as d3 from 'd3';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map';

import highchartsWorldGeo from '@highcharts/map-collection/custom/world.geo.json';

import customWorldGeo from './custom-data/custom.world.geo.json';
import customWorldTopo from './custom-data/custom.world.topo.json';

const customWorldGeoFromTop = topojson.feature(customWorldTopo, customWorldTopo.objects['WORLD-countries-geo']);

highchartsMap(Highcharts);

function D3Map(props) {
  // Adapted from https://bl.ocks.org/animateddata/526bb86fa1b6b5ff49599fc0df4797a4

  const style = {
    stroke: 'rgb(204, 204, 204',
    fill: 'rgb(247, 247, 247)'
  };

  const projection = d3.geoNaturalEarth1()
    .fitSize([props.width, props.height], props.geojson);

  const geoGenerator = d3.geoPath()
    .projection(projection);

  const features = props.geojson.features.map((feature, index) => {
    return (
      <path
        d={geoGenerator(feature)}
        style={style}
        key={index}
      />
    );
  });

  return (
    <svg width={props.width + 'px'} height={props.height + 'px'}>
      <g className="map">{features}</g>
    </svg>
  );
}

function App() {
  return (
    <div>
      <h1>Highcharts Custom Geo Example</h1>
    
      <h2>Higcharts World Geo</h2>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={{series: [{mapData: highchartsWorldGeo }]}}
      />
    
      <h2>Custom World Geo</h2>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={{series: [{mapData: customWorldGeo }]}}
      />
    
      <h2>Custom World Geo from Topo</h2>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={{series: [{mapData: customWorldGeoFromTop }]}}
      />
      
      <h2>D3 Map using Highchart Geo</h2>
      <D3Map geojson={highchartsWorldGeo} width={800} height={600}/>
        
      <h2>D3 Map using Custom Geo</h2>
      <D3Map geojson={customWorldGeo} width={800} height={600}/>
        
    </div>
  );
}

export default App;
