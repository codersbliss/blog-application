import { FILE_UPLOAD_URL} from '../commons/AppConstant';
import useAxiosPrivate from './useAxiosPrivate';

const useUploadFromFileUrl = () => {
    const axiosPrivate = useAxiosPrivate();
    const uploader = async (fileUrl) =>{
        try{
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const file = new File([blob], 'img.png');

            //make post request to upload banner image
            const formData = new FormData();
            formData.append('file', file);

            const URL = await axiosPrivate.post(FILE_UPLOAD_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            return URL.data;
        }catch(err){
            return null;
        }
    }
    return uploader;
}

export default useUploadFromFileUrl;