import ReactECharts from 'echarts-for-react';
import styles from './ChartCard.module.css';

function buildBarOption(data, chartConfig) {
  const { title, xField, yField, unit } = chartConfig;

  const districts = data.map((d) => d[xField]);
  const values = data.map((d) => d[yField]);

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const p = params[0];
        return `${p.name}<br/>${p.marker} ${p.value.toLocaleString()} ${unit}`;
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      top: 40,
      bottom: 30,
      containLabel: true,
    },
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#b0a090',
        fontSize: 13,
        fontWeight: 'normal',
      },
    },
    xAxis: {
      type: 'category',
      data: districts,
      axisLine: { lineStyle: { color: 'rgba(212,168,83,0.2)' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#b0a090',
        fontSize: 10,
        rotate: districts.length > 8 ? 30 : 0,
      },
    },
    yAxis: {
      type: 'value',
      name: unit,
      nameTextStyle: { color: '#6e6058', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212,168,83,0.08)' } },
      axisLabel: { color: '#6e6058', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: values,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#d4a853' },
              { offset: 1, color: '#c41e3a' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: { color: '#e8c97a' },
        },
      },
    ],
  };
}

export default function ChartCard({ data, chartConfig, onItemClick }) {
  const option = buildBarOption(data, chartConfig);

  const onEvents = onItemClick
    ? {
        click: (params) => {
          if (params.name) {
            onItemClick(params.name);
          }
        },
      }
    : {};

  return (
    <div className={styles.card}>
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        onEvents={onEvents}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}
