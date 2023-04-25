import React, { useState } from 'react';
import './Home.css';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Header from '../components/Header.component';
import Chart from "react-apexcharts";
import ChartTypes from "react-apexcharts"
import MovieSelector from '../components/MovieSelector/MovieSelector.component';

function Home() {
    // const char_type: ChartTypes = 'bar'

    const [state, setState] = useState({
        movies: [
            { name: 'The Last Of Use', buttonImage: 'https://br.web.img3.acsta.net/pictures/22/11/30/19/53/5856320.jpg', bgImage: 'https://cdn.portalpower.com.br/wp-content/uploads/2023/01/The-Last-Of-Us-HBO-Wallpaper-13.webp' },
            { name: 'M3GAN', buttonImage: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2023/01/M3gan-01.jpg', bgImage: 'https://cinepop.com.br/wp-content/uploads/2023/01/m3gan-1-1.jpg' },
            // {name: 'The Last Of Use', buttonImage: '', bgImage: 'https://meups.com.br/wp-content/uploads/2023/02/HENRY-SAM-THE-LAST-OF-US-HBO.jpeg'},
            // {name: 'The Last Of Use', buttonImage: '', bgImage: 'https://meups.com.br/wp-content/uploads/2023/02/HENRY-SAM-THE-LAST-OF-US-HBO.jpeg'},
        ],
        selected: 0
    })
    const [chartState, setChartState] = useState({
        options: {
            // chart: {
            //     type: char_type
            // },
            theme: {
                mode: 'dark' as const,
                palette: 'palette7',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light' as const,
                    shadeIntensity: 0.65
                },
            },
            title: {
                text: "History of the the last of us reactions",
                style: { color: "#fff" }
            },
            xaxis: {
                categories: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃'],
                labels: {
                    style: {
                        colors: '#fff'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#fff'
                    }
                }
            },
            grid: {
                show: false
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91, 91, 45, 50, 49]
            }
        ]
    })

    return (
        <main
            style={{
                backgroundImage: `url(${state.movies[state.selected].bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
            }}
            className="Home">
            <Grid2

                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh', background: 'linear-gradient(0deg, rgba(40,44,52,1) 49%, rgba(255,255,255,0) 100%)' }}>

                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={4}>
                    <Header title={state.movies[state.selected].name} />
                </Grid2>
                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={4}>
                    {state.movies.map((movie, idx) => <MovieSelector imageButton={movie.buttonImage} click={() => setState({ ...state, selected: idx})} />)}
                </Grid2>
                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={2}>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet impedit, eligendi earum unde odio ipsam.
                        Quibusdam quidem officiis perferendis numquam possimus veniam eveniet ex. Quam quas deleniti animi porro recusandae.
                    </p>
                </Grid2>
                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={2}>
                    <Chart
                        options={chartState.options}
                        series={chartState.series}
                        type='bar'
                        width="100%"
                        height="300"
                    />
                </Grid2>
                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={2}>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet impedit, eligendi earum unde odio ipsam.
                        Quibusdam quidem officiis perferendis numquam possimus veniam eveniet ex. Quam quas deleniti animi porro recusandae.
                    </p>
                </Grid2>
                <Grid2 lg={8} xs={9} sm={12} md={12} spacing={2}>
                    <Chart
                        options={chartState.options}
                        series={chartState.series}
                        type='line'
                        width="100%"
                        height="300"
                    />
                </Grid2>
            </Grid2>
        </main>
    );
}

export default Home;
