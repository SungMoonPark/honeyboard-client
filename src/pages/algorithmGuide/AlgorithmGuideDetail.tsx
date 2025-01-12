import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';

import { useLocation, useParams } from 'react-router';
import {
    deleteAlgorithmGuideAPI,
    getAlgorithmGuideDetailAPI,
} from '@/api/AlgorithmGuideAPI.ts';
const AlgorithmGuideDetail = () => {
    const { pathname } = useLocation();
    const { guideId } = useParams();
    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'algo_guide',
        contentId: guideId!,
        getDetailAPI: getAlgorithmGuideDetailAPI,
        deleteAPI: deleteAlgorithmGuideAPI,
        navigateAfterDelete: '/study/algorithm/concept',
    });

    if (!data) return null;
    return (
        <>
            <Header
                titleProps={{ title: data.title, onClickLike: handleLike }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleDelete}>
                            글 삭제
                        </Button>
                        <Button onClick={handleEdit}>글 수정</Button>
                    </div>
                </div>
            </Header>

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default AlgorithmGuideDetail;
