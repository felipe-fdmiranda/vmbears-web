export function obterDocumentDoArquivoXml(file: File): Promise<Document> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(event.target?.result as string, 'application/xml');
      resolve(xmlDoc);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
}

export function removerDadoSigilosoDoXml(xmlDoc: Document, tagName: string): Blob {
  const elementsToRemove = xmlDoc.getElementsByTagName(tagName);
  for (const element of Array.from(elementsToRemove)) {
    element.remove()
  }
  const updatedXmlString = new XMLSerializer().serializeToString(xmlDoc);
  return new Blob([updatedXmlString], { type: 'application/xml' });
}
