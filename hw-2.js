const folders = [
    {
      id: 5,
      name: 'Klasör 1',
      files: [
        { id: 17, name: 'profil.jpg' },
        { id: 18, name: 'manzara.jpg'},
      ],
    },
    {
      id: 6,
      name: 'Klasör 2',
      files: [
        { id: 21, name: 'foto.png' },
        { id: 22, name: 'dosya.xls' },
        { id: 23, name: 'file2.xls' }
      ],
    },
    {
      id: 7,
      name: 'Klasör 3',

    },
  ]

const findParentFolder = (array, fileId) => {
  // yardımcı fonksyinumuz. array parametresinden fileId nested objectini içeren objecti return edecek.
    const folder = array.find(object => {
      if(!object.files) {
        object.files = []
      }
      return object.files.some(folder=> folder.id === fileId)
      });
      if (!folder) {
        throw new Error("FileId doesnt exist.");
        }
  return folder 
}
const findItemtoMove = (array, fileId) => {
  // yardımcı fonksiyonumuz. Yeri değiştirilecek itemi destructure ederek döndürür.
  const [item] = array.files.filter(item => item.id === fileId)
  return item
}
const pushItemtoNewArray = (array, folderId, itemtoMove) => {
  // yardımcı fonksiyonumuz. Yeri değiştirilecek filemızı ve eklenecek folderimiza ekleyecek.
  if(!array.some(item => item.id === folderId)) {
      throw new Error("FolderId doesnt exist.")
  }
  const mutatedArray = array.map(item => {
  // array parametresinde map fonksiyonu ile herbir nested objectteki iteme bakar.
  // folderId ile uyuşan itemin içine itemtoMove parametresini ekler.
    if(!item.files && item.id === folderId) {
      item.files = []
    }
    if(item.id === folderId) {
      return {...item, files:[...item.files, itemtoMove]}
    }
    else {
      return item
    }
    })
  return mutatedArray 
}
// 1.SORU
    Array.prototype.move = function(fileId, folderId) {
    // Öncelikle folders arrayinin içinde files klasörünün var olup olmadığını varsa fileId içeren objecti yardımcı fonksiyonumuzla (findParentFolder) kontrol ediyoruz.
    const folder = findParentFolder(this,fileId)
    // Daha sonra taşınacak itemi yardımcı fonksiyonumuzla (findItemtoMove) elde ediyoruz.
    const itemtoRemove = findItemtoMove(folder,fileId)
    // Bir sonraki adımda taşınacak itemi en baştaki klasöründen filter methoduyla kaldırıyoruz.
    const filteredArray = this.map(item => {
        if(item === folder) {
          return {...item, files:item.files.filter(removedItem => removedItem.id !== itemtoRemove.id)}
        }
        else {
          return item
        }
      })
    // son olarak da arraydan yeni bir array oluşturup map functionuyla folderId parametresine uyuyor mu kontrol edip
    // eğer uyuyorsa taşınacak itemi filteredArray parametresine ekleriz.
    const newArr = pushItemtoNewArray(filteredArray, folderId,itemtoRemove)
    return newArr;
}
// 2.SORU
    Array.prototype.copy = function(fileId, folderId) {
        const folder = findParentFolder(this,fileId)
        const itemtoMove = findItemtoMove(folder,fileId)
        const newArray = pushItemtoNewArray(this,folderId,itemtoMove)
    return newArray;
         }
// 3.SORU
    Array.prototype.remove = function(fileId) {
        // Öncelikle folders arrayinin içinde files klasörünün var olup olmadığını varsa fileId içeren objecti yardımcı fonksiyonumuzla (findParentFolder) kontrol ediyoruz.
        const folder = findParentFolder(this,fileId)
        // Daha sonra bu folderdan fileId parametresiyle gelen itemi filtreliyoruz.
        const filteredFolder = {...folder, files:folder.files.filter(item => item.id !== fileId)}
        // Son olarak filtrelediğimiz nested objecti files array'ımıza ekleyip döndürüyoruz.
        const newArr = this.map(item => item.id === folder.id ? filteredFolder : item)
    return newArr;
         }


// 4.SORU
    Array.prototype.removeFolder = function(fileId) {
        // Öncelikle id'si fileId ile aynı olan ojecti filtreliyoruz.filter array döneceği için [folder] destructure kullandık.
        const [folder] = this.filter(item => item.id === fileId ? item : null)
        if(!folder) {
            throw new Error ("FileId doesnt exist.")
        }
        // Daha sonra bu folderin içinden files arrayını çıkarttık.
        const filteredFolder = {id:folder.id, name:folder.name}
        // Finalde değiştirilmiş folderımızı files klasörüne geri ekledik.
        const newArr = this.map(item => item.id === folder.id ? filteredFolder : item)
    return newArr;
         }
// 5.SORU
    Array.prototype.parentFolderOf = function(fileId) {
        // Öncelikle findParentFolder yardımcı fonksiyonumuzla fileId'nin ait olduğu fonksiyonu buluruz.
        const folder = findParentFolder(this,fileId)
        // Eğer mevcut değilse error tetikleriz.
        // Son olarak da parent folder'ın idsini döndürürüz.
    return folder.id;
        }
// TESTLER
console.log(folders.move(17,8));
//console.log(folders.copy(18,6)); 
//console.log(folders.remove(24));
/* console.log(folders.removeFolder(5));
console.log(folders.parentFolderOf(17));  */ 
 