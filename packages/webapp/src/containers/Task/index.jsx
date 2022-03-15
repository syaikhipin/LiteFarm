import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle/v2';
import { AddLink, Semibold } from '../../components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/all';
import styles from './styles.module.scss';

import { isAdminSelector, loginSelector } from '../userFarmSlice';
import { resetAndUnLockFormData } from '../hooks/useHookFormPersist/hookFormPersistSlice';
import { getManagementPlansAndTasks } from '../saga';
import TaskCard from './TaskCard';
import { onAddTask } from './onAddTask';
import MuiFullPagePopup from '../../components/MuiFullPagePopup/v2';
import TasksFilterPage from '../Filter/Tasks';
import { filteredTaskCardContentSelector } from './useTasksFilter';
import { isFilterCurrentlyActiveSelector, tasksFilterSelector } from '../filterSlice';
import ActiveFilterBox from '../../components/ActiveFilterBox';

export default function TaskPage({ history }) {
  const { t } = useTranslation();
  const isAdmin = useSelector(isAdminSelector);
  const { user_id, farm_id } = useSelector(loginSelector);
  const taskCardContents = useSelector(filteredTaskCardContentSelector);
  const dispatch = useDispatch();

  const tasksFilter = useSelector(tasksFilterSelector);
  const isFilterCurrentlyActive = useSelector(isFilterCurrentlyActiveSelector('tasks'));

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const onFilterClose = () => {
    setIsFilterOpen(false);
  };
  const onFilterOpen = () => {
    setIsFilterOpen(true);
  };

  useEffect(() => {
    dispatch(getManagementPlansAndTasks());
  }, []);

  useEffect(() => {
    dispatch(resetAndUnLockFormData());
  }, []);

  return (
    <Layout classes={{ container: { backgroundColor: 'white' } }}>
      <PageTitle title={t('TASK.PAGE_TITLE')} style={{ paddingBottom: '20px' }} />

      <div className={styles.taskCountContainer}>
        <div className={styles.taskCount}>
          {t('TASK.TASKS_COUNT', { count: taskCardContents.length })}
        </div>
        <AddLink onClick={onAddTask(dispatch, history, `/tasks`)}>{t('TASK.ADD_TASK')}</AddLink>
        <FiFilter onClick={onFilterOpen} />
      </div>

      <MuiFullPagePopup open={isFilterOpen} onClose={onFilterClose}>
        <TasksFilterPage onGoBack={onFilterClose} />
      </MuiFullPagePopup>

      {isFilterCurrentlyActive && (
        <ActiveFilterBox
          pageFilter={tasksFilter}
          pageFilterKey={'tasks'}
          style={{ marginBottom: '32px' }}
        />
      )}

      {taskCardContents.length > 0 ? (
        taskCardContents.map((task) => (
          <TaskCard
            key={task.task_id}
            onClick={() => history.push(`/tasks/${task.task_id}/read_only`)}
            style={{ marginBottom: '14px' }}
            {...task}
          />
        ))
      ) : (
        <Semibold style={{ color: 'var(--teal700)' }}>{t('TASK.NO_TASKS_TO_DISPLAY')}</Semibold>
      )}
    </Layout>
  );
}
