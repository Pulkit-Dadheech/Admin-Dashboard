import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,RadialLinearScale } from 'chart.js';

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale
);

export default ChartJs;
