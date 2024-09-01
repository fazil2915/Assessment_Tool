import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { useSelector } from 'react-redux';

const PieChart = ({ isDashboard = false }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/teacher/pipeline', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      // Format data for Nivo Pie Chart
      const formattedData = result.flatMap(item => 
        item.gradingOptions.map(option => ({
          id: option.option,
          label: option.option,
          value: option.count
        }))
      );

      console.log('Formatted Data:', formattedData);
      setData(formattedData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    data.length > 0 ? (
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.gray[100],
              },
            },
            legend: {
              text: {
                fill: colors.gray[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.gray[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.gray[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.gray[100],
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={isDashboard ? 0.5 : 0.4}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.gray[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={!isDashboard}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    ) : (
      <div>Loading...</div>
    )
  );
};

export default PieChart;
