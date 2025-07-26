/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material'
function NewsCard({date, title, desc, thumbnail}:any) {
    return (
        <Box
        display={'flex'}
        alignItems={"center"}
        gap={3}
        px={1}
        py={2}
        >
            <img src={thumbnail} width={"30px"} height={"30px"} alt='default s'/>
            <Box 
                display={'flex'}
                flexDirection={'column'}
            >
                <Typography variant='caption'>
                    {date}
                </Typography>
                <Typography
                    fontWeight={"bold"}
                    maxWidth={"min(50dvw, 45ch)"} overflow={'hidden'} 
                    whiteSpace={"nowrap"} textOverflow={'ellipsis'}
                    sx={{wordWrap:'break-word'}}
                >
                    {title}
                </Typography>
                <Typography
                    width={"min(60dvw,300px)"} overflow={'hidden'} 
                    whiteSpace={"nowrap"} textOverflow={'ellipsis'}
                    sx={{wordWrap:'break-word'}}
                >
                    {desc}
                </Typography>

            </Box>
        </Box>
    )
}

export default NewsCard
