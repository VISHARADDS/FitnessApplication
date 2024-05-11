import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core"
import "../sammani/assets/css/Ads1.css";
import { Carousel } from 'react-bootstrap';
import gambar1 from '../sammani/assets/img/bg2.jpg';

const theme = createTheme();

const Posters = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
        <ThemeProvider theme={theme}>
            <div style={{ paddingBottom: "0px", height:'180px'}}>
                <Box py={20}>
                    <Carousel  style={{ width: "340px"}}  interval={null}>
                        <Carousel.Item interval={null}>
                            <img
                                className="d-block w-95"
                                src={gambar1}
                                alt="First slide"
                                style={{ height: "45vh", objectFit: "cover"}}
                            />
                        </Carousel.Item>
                    </Carousel>
                    <br />
                </Box>
                {isMobile ? (
                    <Box textAlign="right">
                       
                    </Box>
                ) : (
                    <> </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default Posters;
