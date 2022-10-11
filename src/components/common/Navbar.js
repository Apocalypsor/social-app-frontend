import React, {useState} from "react";

import logo from "../../assets/logo.png";
import {
    AppBar,
    Autocomplete,
    Avatar,
    CircularProgress,
    Divider,
    Fade,
    ImageList,
    ImageListItem,
    InputBase,
    Stack,
    Tooltip
} from "@mui/material";
import Link from "@mui/material/Link";
import {useLocation, useNavigate} from "react-router-dom";
import {AddIcon, HomeActiveIcon, HomeIcon} from "../../icons";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import {defaultUser, friendsDemo, getUser} from "../../data";
import Grid from "@mui/material/Grid";

const theme = createTheme();

const styles = {
    appBar: {
        background: "#ffffff !important",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        order: 0,
        zIndex: "100 !important",
        boxShadow: "0 0 0 0 !important",
        borderBottom: "1.5px solid rgba(var(--ce3,239,239,239),1)",
    },
    section: {
        alignItems: "center",
        display: "flex",
        height: 68,
        maxWidth: 975,
        width: "100%",
        justifyContent: "center",
        padding: "0px 10px"
    },
    logoContainer: {
        display: "flex",
        flex: "1 9999 0%",
        minWidth: 40,
    },
    logoWrapper: {
        flex: "0 0 auto",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "stretch"
    },
    logo: {
        marginTop: 2,
        height: 50,
        objectFit: "contain"
    },
    input: {
        height: 28,
        fontSize: "14px !important",
        background: "rgba(var(--b3f,250,250,250),1)",
        border: "solid 1px rgba(var(--b6a,219,219,219),1)",
        borderRadius: 3,
        color: "rgba(var(--i1d,38,38,38),1)",
        outline: 0,
        padding: "3px 3px 3px 26px",
        zIndex: 2
    },
    linksContainer: {
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flex: "1 0 0%",
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },
    linksWrapper: {
        display: "flex",
        paddingLeft: 24,
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 0
        },
        alignItems: "center",
        whiteSpace: "nowrap",
    },
    resultContainer: {width: 215},
    resultWrapper: {
        display: "flex",
        alignItems: "center",
        height: "50px",
        padding: "8px 16px"
    },
    avatarWrapper: {
        margin: "0 10px 0 0"
    },
    nameWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    icon: {
        position: "relative",
        "&:not(:first-child)": {
            marginLeft: 22
        }
    },
    notifications: {
        position: "relative",
        "&::after": {
            right: 10,
            width: 4,
            bottom: "-5px",
            height: 4,
            margin: "0 auto",
            position: "absolute",
            background: "#ed4956",
            transition: "bottom .2s ease-in-out",
            borderRadius: 2,
            content: '""'
        }
    },
    profileActive: {
        border: "1px solid rgba(var(--i1d,38,38,38),1)",
        borderRadius: "50%",
        height: 28,
        marginLeft: "-3px",
        marginTop: "-3px",
        position: "absolute",
        width: "28px !important"
    },
    profileImage: {
        width: "28px !important",
        height: "28px !important",
        marginBottom: "5px !important"
    },
    tooltipContainer: {
        display: "flex",
        alignItems: "center",
        "& div": {
            margin: "0 5px"
        }
    },
    tooltip: {
        display: "flex",
        alignItems: "center"
    },
    resultLink: {
        background: "#fafafa",
        width: "100%",
        borderBottom: "solid 1px rgba(var(--b38,219,219,219),1)",
        "&:hover": {
            background: "rgba(var(--b3f,250,250,250),1)"
        }
    },
    progressBar: {
        top: 0,
        zIndex: 1031,
        left: 0,
        height: 3,
        background:
            "#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)",
        backgroundSize: "500%",
        animation:
            "2s linear infinite $LoadingBarProgress,.5s ease-out $LoadingBarEnter",
        transformOrigin: "left",
        width: "100%"
    },
    progressContainer: {
        position: "absolute",
        zIndex: 2000,
        width: "100%",
        pointerEvents: "none"
    },
    progressBackground: {
        boxShadow: "0 0 10px #29d, 0 0 5px #29d",
        display: "block",
        height: "100%",
        opacity: 1,
        position: "absolute",
        right: 0,
        transform: "rotate(3deg) translate(0px, -4px)",
        width: 100
    },
    newPostModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 502,
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    newPostWrapper: {
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "24px",
        paddingBottom: "24px",
        textAlign: 'center',
        marginTop: "10%",
        marginBottom: "10%"
    },
    uploadButtonWrapper: {
        marginTop: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    searchToolTip: {
        position: "fixed",
        backgroundColor: "#fff",
        color: "#000",
        padding: 0,
        pointerEvents: "all",
        boxShadow: "0 0 5px 1px rgba(var(--jb7,0,0,0),.0975)",
    }
};

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate()
    const path = location.pathname;

    return (
        <div>
            <AppBar sx={styles.appBar}>
                <Grid container spacing={2} sx={styles.section}>
                    <Grid item xs={4}>
                        <Logo/>
                    </Grid>
                    <Grid item xs={4}>
                        <Search history={navigate}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Links path={path}/>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}

function Logo() {
    return (
        <div>
            <Box sx={styles.logoContainer}>
                <Link href="/">
                    <div style={styles.logoWrapper}>
                        <img src={logo} alt="Toktik" style={styles.logo}/>
                    </div>
                </Link>
            </Box>
        </div>
    );
}

function Search({history}) {
    const [loading] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState("");

    const hasResults = Boolean(query) && results.length > 0;

    React.useEffect(() => {
        if (!query.trim()) return;
        setResults(Array.from([0, 1, 2, 3, 4, 5], () => getUser()));
    }, [query]);

    function handleClearInput() {
        setQuery("");
    }

    return (
        <Tooltip
            sx={styles.searchToolTip}
            arrow
            interactive
            TransitionComponent={Fade}
            open={hasResults}
            title={
                hasResults && (
                    <Grid sx={styles.resultContainer} container>
                        {results.map(result => (
                            <Grid
                                key={result.id}
                                item
                                sx={styles.resultLink}
                                onClick={() => {
                                    history(`/${result.username}`);
                                    handleClearInput();
                                }}
                            >
                                <div style={styles.resultWrapper}>
                                    <div style={styles.avatarWrapper}>
                                        <Avatar src={result.profileImage} alt="user avatar"/>
                                    </div>
                                    <div style={styles.nameWrapper}>
                                        <Typography variant="body1">{result.username}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {result.name}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        >
            <InputBase
                sx={styles.input}
                onChange={event => setQuery(event.target.value)}
                startAdornment={<span style={styles.searchIcon}/>}
                endAdornment={
                    loading ? (
                        <CircularProgress/>
                    ) : (
                        <span onClick={handleClearInput} style={styles.clearIcon}/>
                    )
                }
                placeholder="Search"
                value={query}
            />
        </Tooltip>
    );
}

function Links({path}) {
    return (
        <div style={styles.linksContainer}>
            <Stack direction="row" spacing={4} sx={styles.linksWrapper}>
                <Link href="/">{path === "/" ? <HomeActiveIcon/> : <HomeIcon/>}</Link>
                <NewPostModal/>
                <Link href="#">
                    <Avatar alt="Profile User" src={defaultUser.profileImage}
                            sx={styles.profileImage}/>
                </Link>
            </Stack>
        </div>
    );
}


function NewPostModal() {
    const [open, setOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setUploadedImages([]);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        console.log("uploading");
        const files = document.getElementById("image-upload-input").files;
        if (files.length === 0) {
            console.log("No file selected!");
        } else {
            let images = [];
            for (const file of files) {
                console.log(file);
                const image = {
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file)
                };
                images.push(image);
            }

            setUploadedImages(images);
        }
    }

    return (
        <>
            <Link href="#" onClick={handleClick}><AddIcon/></Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
            >
                <Box sx={styles.newPostModal}>
                    <Typography variant="h5" textAlign="center">
                        Create a new post
                    </Typography>
                    <Divider/>
                    {uploadedImages.length > 0 ? (
                        <ImageList sx={{width: 500, height: 297}} cols={3} rowHeight={164}>
                            {uploadedImages.map((item) => (
                                <ImageListItem key={item.url}>
                                    <img
                                        src={item.url}
                                        srcSet={item.url}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
                        <Container sx={styles.newPostWrapper}>
                            <Button variant="text" component="label" sx={{
                                height: "180px",
                                width: "180px",
                            }}>
                                <UploadFileIcon sx={{height: "100%", width: "100%", color: "black"}}/>
                                <input id="image-upload-input" hidden accept="image/*,video/*" multiple type="file"
                                       onChange={handleUpload}/>
                            </Button>
                        </Container>
                    )}

                    <Container>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <Autocomplete
                            multiple
                            options={friendsDemo}
                            getOptionLabel={(option) => "@" + option.username}
                            filterSelectedOptions
                            sx={{marginTop: "10px"}}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tag your friends"
                                    placeholder="More"
                                />
                            )}
                        />
                    </Container>
                    <Container sx={styles.uploadButtonWrapper}>
                        <Button variant="contained" onClick={handleClose}>
                            Upload
                        </Button>
                        <FormControlLabel
                            control={<Checkbox inputProps={{'aria-label': 'controlled'}}/>}
                            label="Private?"
                            sx={{
                                position: "absolute",
                                right: "20%",
                            }}
                        />
                    </Container>
                </Box>
            </Modal>
        </>
    )
}
