import cloudinary from '../config/cloudinary';

export const extrairPublicId = (url: string): string | null => {
    try {
        if (!url || !url.includes('cloudinary.com')) {
            return null;
        }

        // URL: https://res.cloudinary.com/cloud/image/upload/v123/sistema-preventiva/usuario_1/preventiva_2/123456-antes-foto.jpg
        const urlParts = url.split('/');
        const fileWithExt = urlParts.pop(); // "123456-antes-foto.jpg"
        const fileName = fileWithExt?.split('.')[0]; // "123456-antes-foto"
        
        // Encontrar onde começa "sistema-preventiva"
        const folderStartIndex = urlParts.findIndex(part => part === 'sistema-preventiva');
        if (folderStartIndex === -1) {
            return null;
        }
        
        const folderParts = urlParts.slice(folderStartIndex); // ["sistema-preventiva", "usuario_1", "preventiva_2"]
        const publicId = `${folderParts.join('/')}/${fileName}`; // "sistema-preventiva/usuario_1/preventiva_2/123456-antes-foto"
        
        return publicId;
    } catch (error) {
        console.log('❌ Erro ao extrair public_id:', error);
        return null;
    }
};

export const deletarImagem = async (url: string): Promise<boolean> => {
    try {
        const publicId = extrairPublicId(url);
        
        if (!publicId) {
            console.log('Não foi possível extrair public_id da URL:', url);
            return false;
        }

        const deleteResult = await cloudinary.uploader.destroy(publicId);
        
        if (deleteResult.result === 'ok') {
            console.log('Imagem removida do Cloudinary com sucesso');
            return true;
        } else if (deleteResult.result === 'not found') {
            console.log('Imagem não encontrada no Cloudinary');
            return false;
        } else {
            console.log('Falha ao remover imagem:', deleteResult.result);
            return false;
        }
    } catch (error) {
        console.log('Erro ao deletar imagem do Cloudinary:', error);
        return false;
    }
};

export const isCloudinaryUrl = (url: string): boolean => {
    if (!url) return false;
    return url.includes('cloudinary.com');
};

export const obterInfoImagem = async (url: string): Promise<any> => {
    try {
        const publicId = extrairPublicId(url);
        if (!publicId) return null;

        const result = await cloudinary.api.resource(publicId);
        return result;
    } catch (error) {
        console.log('❌ Erro ao obter informações da imagem:', error);
        return null;
    }
};

export const listarImagensUsuario = async (userId: string): Promise<any[]> => {
    try {
        const folder = `sistema-preventiva/usuario_${userId}`;
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: folder,
            max_results: 100
        });
        
        return result.resources || [];
    } catch (error) {
        console.log('❌ Erro ao listar imagens do usuário:', error);
        return [];
    }
};