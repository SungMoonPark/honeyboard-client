import { getWebGuideDetailAPI, updateWebGuideAPI } from '@/api/WebGuideAPI';
import WebGuideForm from '@/components/templates/WebGuideForm';
import { useAuth } from '@/hooks/useAuth';
import useToastEditor from '@/hooks/useToastEditor';
import { useModalStore } from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const WebGuideUpdate = () => {
    const { pathname } = useLocation();
    const { guideId } = useParams();
    const { data } = useQuery({
        queryKey: ['web_guide', guideId],
        queryFn: () => getWebGuideDetailAPI({ guideId: guideId as string }),
    });

    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();
    const [title, setTitle] = useState('');

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const userRole = userInfo?.role;
    const generationId = userInfo?.generationId;

    useEffect(() => {
        if (userRole !== 'ADMIN') {
            openModal({
                title: '페이지 접근 권한이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                    navigate(-1);
                },
            });
        }

        if (data) {
            setTitle(data.title);
        }
    }, [data]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webConceptEditor',
        initialContent: data?.content ?? '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleSubmit = async () => {
        if (!title?.trim()) {
            openModal({
                title: '제목을 입력해주세요.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }

        if (!userId || !generationId) {
            openModal({
                title: '로그인 후 이용해주세요.',
                onCancelClick: () => {
                    navigate('/login');
                    closeModal();
                },
            });
            return;
        }

        try {
            const { content, thumbnail } = await onSubmit();

            if (!guideId) {
                throw new Error('guideId is required');
            }
            await updateWebGuideAPI({
                guideId: guideId,
                data: {
                    title,
                    content,
                    thumbnail,
                },
            });

            navigate(`/study/web/concept/${guideId}`);
        } catch (error) {
            console.error('게시글 수정을 실패했습니다: ', error);
            openModal({
                title: '게시글 수정을 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const mode = 'edit' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleCancel,
        handleSubmit,
        title: title!,
    };
    return <WebGuideForm {...props} />;
};

export default WebGuideUpdate;
