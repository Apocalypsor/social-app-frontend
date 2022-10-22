import React from "react";
import Layout from "../components/common/Layout";
import UserCard from "../components/common/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import LoadingScreen from "../components/common/LoadingScreen";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import {Button, CircularProgress} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import axios from "axios";
import {Navigate} from "react-router-dom";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));


const theme = createTheme();

const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "minmax(auto, 600px) 300px",
        gridGap: 35,
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "minmax(auto, 600px)",
            justifyContent: "center"
        },
        "&.slickSlider": {
            display: "grid"
        }
    },
    sidebarContainer: {
        display: "grid",
        margin: "0px 28px 24px",
        justifyContent: "center",
        gridTemplateColumns: "minmax(auto, 300px)"
    },
    sidebarWrapper: {position: "fixed", width: 293}
}

function FeedPage() {
    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        axios.get(
            "http://localhost:4000/post?_sort=id&_order=desc&_limit=5&_page=" + page
        ).then((res) => {
            setPosts(posts.concat(res.data));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleScroll = () => {
        setPage(page + 1);
    };

    if (loading) return <LoadingScreen/>;

    return (
        <Layout>
            {!sessionStorage.getItem("CurrentUsername") ? <Navigate to="/login"/> : (
                <div style={styles.container}>
                    <div>
                        {Array.from(posts).map(
                            (post, index) => (
                                <React.Suspense key={post.id} fallback={<FeedPostSkeleton/>}>
                                    <FeedPost index={index} post={post}/>
                                </React.Suspense>
                            )
                        )}
                    </div>
                    <div>
                        <div style={{position: "fixed", width: "23%"}}>
                            <UserCard avatarSize={50}/>
                            <FeedSideSuggestions/>
                        </div>
                    </div>
                    <Container>
                        <Button variant="text" onClick={handleScroll}>Load More</Button>
                        <br/>
                        <CircularProgress/>
                    </Container>
                </div>
            )
            }
        </Layout>
    );
}

export default FeedPage;