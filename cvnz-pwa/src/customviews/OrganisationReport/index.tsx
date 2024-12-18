
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { IGoalType } from 'src/redux/model/goal.model';
import { IProject } from 'src/redux/model/project.model';
import _ from 'underscore';
import OrgGoalsDropdown from '../CommonComponents/OrgGoalsDropdown';
import ReportProjectDropDown from './ReportProjectDropDown';
import { IDateRange } from './TimeFrameCalculation';
import TimeframeDropdown from './TimeframeDropdown';
import PerformanceOverTime from '../Reports/PerformanceOverTime';
import { useParams } from 'react-router';

export class ReportDataOutcome {
  total: number = 0;
  date: string = "";
  metric: string = ""
  month: string = ""
}

function OrganisationReport() {

  const app = firebase.app();
  const functions = app.functions("australia-southeast1");
  const params = useParams<{ organisation: string }>();
  const [timeFrames, setTimeFrame] = useState<IDateRange | undefined>(undefined);
  const [goalTypeSelected, setGoalTypeSelected] = useState<IGoalType | undefined>(undefined);
  const [selectedProject, setProjectSelected] = useState<IProject | undefined>(undefined);
  const [generatedReportValues, setGeneratedReportValues] = useState<ReportDataOutcome[]>([]);
  const [uploading, setUploading] = React.useState(false);

  const setSelectedGoalType = async (event, selectedGoalType: IGoalType) => {
    event.preventDefault();
    if (selectedGoalType) {
      setGoalTypeSelected(selectedGoalType);
    }
  }

  function selectedTimeFrame(event, timeFrame: IDateRange) {
    event.preventDefault();
    setTimeFrame(timeFrame);
  }
  function setSelectedProject(event, project: IProject) {
    event.preventDefault();
    setProjectSelected(project);
  }

  async function generateReport() {
    setUploading(true);
    var generatedValues = await functions.httpsCallable("generateReport");
    generatedValues({ params: { organisationId: params.organisation, projectId: selectedProject?.id ?? "", startDate: timeFrames?.startDate, endDate: timeFrames?.endDate, goalTypeId: goalTypeSelected?.id } }).then(async result => {
      if (result) {
        setGeneratedReportValues(result.data);
        setUploading(false);
      }
    }).catch(function (error) {
      console.log("error", error);
    });
  }

  return <>
    {
      uploading ? (<><LinearProgress></LinearProgress></>) : (<div></div>)
    }
    <Card style={{ margin: '20px' }}>
      <CardHeader title="Reporting" titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }} subheaderTypographyProps={{ variant: 'body1' }} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <OrgGoalsDropdown title={'Select Goal'} setSelectedGoalType={setSelectedGoalType}></OrgGoalsDropdown>
          </Grid>
          <Grid item md={4} xs={12}>
            <TimeframeDropdown title={"timeframe"} setSelectedTimeframe={selectedTimeFrame}></TimeframeDropdown>
          </Grid>
          <Grid item md={4} xs={12}>
            <ReportProjectDropDown setSelectedProject={setSelectedProject}></ReportProjectDropDown>
          </Grid>
          <Grid item lg={12} xs={12}>
            {generatedReportValues.length > 0 ?
              (
                <div>
                  <PerformanceOverTime monthlyCount={generatedReportValues} generatedData={generatedReportValues} />
                </div>
              ) :
              (
                <div></div>
              )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid item alignItems="flex-end" container justifyContent="flex-end">
          <Button type="submit" size='small' color='primary' variant="contained" onClick={generateReport}>
            Generate report
          </Button>
        </Grid>
      </CardActions>
    </Card>
  </>;
}

export default OrganisationReport;
