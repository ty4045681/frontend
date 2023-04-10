import React from 'react';
import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {API_BASE_URL} from "@/config";

export interface PaperData {
    id: string;
    conferenceId: string;
    title: string;
    authors: string[];
    abstract: string;
    keywords: string[];
}

export interface PresentationData {
    id: string;
    conferenceId: string;
    paperId: string;
    title: string;
}

interface DownloadTableProps {
    papers?: PaperData[];
    presentations?: PresentationData[];
    dataType: 'papers' | 'presentations';
}

const DownloadTable: React.FC<DownloadTableProps> = ({
                                                         papers,
                                                         presentations,
                                                         dataType,
                                                     }) => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const data = dataType === 'papers' ? papers : presentations

    const downloadLink = (item: PaperData | PresentationData) => {
        switch (dataType) {
            case "papers":
                return `${API_BASE_URL}/paper/${item.id}/download`
            case "presentations":
                return `${API_BASE_URL}/presentation/${item.id}/download`
        }
    }

    const handleDownload = async (item: PaperData | PresentationData) => {
        try {
            const response = await fetch(downloadLink(item))
            if (!response.ok) {
                throw new Error("Error downloading the file")
            }

            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${item.title}`
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()

            setTimeout(() => {
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
            }, 100)
        } catch (e) {
            console.error('Download failed: ', e)
        }
    }

    const handleSelect = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data?.map((item) => item.id);
            setSelected(typeof newSelected === 'undefined' ? [] : newSelected);
        } else {
            setSelected([]);
        }
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            {/* Additional functionality for "select all" can be implemented here */}
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < (data?.length ?? 0)}
                                checked={(data?.length ?? 0) > 0 && selected.length === (data?.length ?? 0)}
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        {dataType === 'papers' ? (
                            <>
                                <TableCell>Title</TableCell>
                                <TableCell>Authors</TableCell>
                                <TableCell>Abstract</TableCell>
                                <TableCell>Keywords</TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell>Title</TableCell>
                            </>
                        )}
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((item) => {
                            const isItemSelected = isSelected(item.id);

                            return (
                                <TableRow
                                    key={item.id}
                                    hover
                                    onClick={() => handleSelect(item.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isItemSelected} />
                                    </TableCell>
                                    {dataType === 'papers' ? (
                                        <>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{(item as PaperData).authors.join(', ')}</TableCell>
                                            <TableCell>{(item as PaperData).abstract}</TableCell>
                                            <TableCell>{(item as PaperData).keywords.join(', ')}</TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{item.title}</TableCell>
                                        </>
                                    )}
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDownload(item)
                                            }}
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DownloadTable;

