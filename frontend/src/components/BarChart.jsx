import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '@/theme';
import { useSelector } from 'react-redux';

const BarChart = ({ isDashboard = false }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/pipeline`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      // Format data for Nivo
      const formattedData = result.map((item) => ({
        type: item.type,
        Manual: item.gradingOptions.find((opt) => opt.option === 'Manual')?.count || 0,
        Automated: item.gradingOptions.find((opt) => opt.option === 'Automated')?.count || 0,
      }));

      console.log('Formatted Data:', formattedData);
      setData(formattedData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    data.length > 0 ? (
      <div style={{ height: 400 }}>
        <ResponsiveBar
          data={data}
          keys={['Manual', 'Automated']}
          indexBy="type"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', '1.6']],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'Assessment Type',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'Count',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in type: ${e.indexValue}`}
        />
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
};

export default BarChart;
