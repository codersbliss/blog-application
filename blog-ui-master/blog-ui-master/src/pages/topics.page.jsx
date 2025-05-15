import ExploreTopicTab from '../components/ExploreTopicTab';
import RecommendedBlogs from '../components/RecomendedBlogs';
import TopicProvider from '../Providers/TopicProvider';
import TopicBanner from '../components/TopicBanner';
 
const TopicPage = () => {
    return (
        <TopicProvider>
            <ExploreTopicTab/>
            <TopicBanner/>            
            <RecommendedBlogs/>
        </TopicProvider>
    );
};

export default TopicPage;
