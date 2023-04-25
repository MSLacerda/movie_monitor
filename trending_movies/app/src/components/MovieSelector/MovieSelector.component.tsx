import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';


const MovieSelector: React.FC<{imageButton:string, click:any}> = ({ imageButton, click}) => {
    return (
        <ButtonBase
            onClick={click}
            style={{
                position: 'relative',
                borderRadius: 10,
                height: 70,
                width: 250,
                marginRight: 5,
                backgroundImage: `url(${imageButton})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%'
            }}
        />
    )
}

export default MovieSelector;